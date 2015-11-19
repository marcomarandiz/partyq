import {
  ADD_SONG,
  UPVOTE_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  SET_STATE,
  ADD_SONG_FROM_HISTORY
} from '../common/constants/ActionTypes';

const https = require('https');
const moment = require('moment');

export const initialState = {
  queue: { songlist: [], currentSong: {}, isPlaying: true },
  history: { songlist: []}
};

// We should probably move all of this somewhere else
function getVidFromUrl(url) {
  // lazy query string parse for vid
  if (url.indexOf('v=') === -1) {
    return '';
  }
  const temp = url.split('v=');
  const vid = temp[1].split('&');
  return vid[0];
}

function updateSong(url) {
  const song = {};
  song.url = url;
  song.vid = getVidFromUrl(url);

  if (song.vid === '') {
    console.log('Invalid URL. Not adding song.');
    return song;
  }

  song.artist = null;
  song.duration = null;
  song.src = null;
  song.title = null;
  song.uploadDate = null;
  song.upvotes = 0;
  song.userUpvotes = [];
  song.thumbnail = null;
  song.endedAt = null;

  // key has to be passed in as an environment varibale
  // Example: YOUTUBE_API=aksdfjalksdfjalskdfjlk npm start
  if (!process.env.YOUTUBE_API) {
    console.log('You didnt put in an API key correctly so partyq will not pull song information from the YouTube API.');
    console.log('To run with API key do $YOUTUBE_API={API_KEY_HERE} npm start');
    return song;
  }

  const callAPIURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='
                 + song.vid + '&key=' + process.env.YOUTUBE_API;

  https.get(callAPIURL, function(res) {
    let data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      const youTubeSongData = JSON.parse(data);
      if (youTubeSongData.error) {
        console.log('API error');
        console.log('Reason: ' + youTubeSongData.error.errors[0].reason);
        console.log('Message: ' + youTubeSongData.error.errors[0].message);
      } else if (!youTubeSongData.items[0]) {
        console.log('Invalid VID: ' + song.vid);
      } else {
        song.artist = youTubeSongData.items[0].snippet.channelTitle;
        song.duration = youTubeSongData.items[0].contentDetails.duration;
        song.title = youTubeSongData.items[0].snippet.title;
        song.uploadDate = youTubeSongData.items[0].snippet.publishedAt;
        song.thumbnail = youTubeSongData.items[0].snippet.thumbnails.default.url;
        song.src = 'youtube';
        console.log(song);
      }
      return song;
    });
  });
  return song;
}

function queueReducer(state = initialState.queue, action) {
  const queueSonglist = state.songlist;
  const currentSong = state.currentSong;
  const userid = action.id;
  switch (action.type) {
  case ADD_SONG:
    const song = updateSong(action.url);
    if (song.vid === '') {
      return state;
    }
    if (Object.keys(currentSong).length === 0 ) {
      return {
        ...state,
        currentSong: song
      };
    }
    return {
      ...state,
      songlist: [
        ...queueSonglist,
        song
      ]
    };
  case UPVOTE_SONG:
    // Only upvote song if there user has not upvoted
    // Just checks the list of all user upvotes to see if userid in it
    if (queueSonglist[action.index].userUpvotes.indexOf(userid) > -1) {
      return state;
    }
    return {
      ...state,
      // Upvote song in songlist
      songlist: [
        ...queueSonglist.slice(0, action.index),
        Object.assign({}, queueSonglist[action.index],
          {
            upvotes: queueSonglist[action.index].upvotes + 1,
            // Add userid to the usersUpvotes list
            userUpvotes: [
              ...queueSonglist[action.index].userUpvotes,
              userid
            ]
          }),
        ...queueSonglist.slice(action.index + 1)
        // Sort by upvotes, descending
      ].sort((a, b) => b.upvotes - a.upvotes),
    };
  case PLAY_SONG:
    return {
      ...state,
      isPlaying: true
    };
  case PAUSE_SONG:
    return {
      ...state,
      isPlaying: false
    };
  default:
    return state;
  }
}

export default function mainReducer(state = initialState, action) {
  const { queue, history } = state;
  const queueSonglist = queue.songlist;
  const currentSong = queue.currentSong;
  const historySonglist = history.songlist;
  switch (action.type) {
  case SET_STATE:
    return action.state;
  case NEXT_SONG:
    // TODO: Move this out of NEXT_SONG and into own function
    let newState = state;

    // If no Current Song and there is song in Queue
    // This logic should never come into play with current reducer

    /*
    if (Object.keys(currentSong).length === 0 ) {
      if (queueSonglist.length > 0) {
        return {
          ...state,
          queue: {
            currentSong: queueSonglist[0],
            songlist: queueSonglist.slice(1),
            isPlaying: true
          }
        }
      } else {
        return state;
      }
    }
    */

    if (Object.keys(currentSong).length !== 0 ) {
      const songEndMoment = moment();
      currentSong.endedAt = songEndMoment.format('dddd h:mm:ss a');
      let nextSong = {};
      let isPlaying = queue.isPlaying;
      if (queueSonglist.length > 0) {
        nextSong = queueSonglist[0];
        isPlaying = true;
      }
      newState = {
        ...state,
        queue: {currentSong: nextSong, songlist: queueSonglist.slice(1), isPlaying: isPlaying},
        history: {songlist:
        [
          ...historySonglist,
          currentSong
        ]}
      };
    }
    return newState;
  case ADD_SONG_FROM_HISTORY:
    const song = historySonglist[action.index];
    song.upvotes = 0;
    song.endedAt = null;
    song.userUpvotes = [];
    if (Object.keys(currentSong).length === 0 ) {
      return {
        ...state,
        queue: {
          currentSong: song,
          songlist: queueSonglist,
          isPlaying: queue.isPlaying
        }
      };
    }
    return {
      ...state,
      queue: {
        currentSong: currentSong,
        isPlaying: queue.isPlaying,
        songlist:
        [
          ...queueSonglist,
          song
        ]
      }
    };
  default:
    return {
      ...initialState,
      queue: queueReducer(queue, action),
      history
    };
  }
}
