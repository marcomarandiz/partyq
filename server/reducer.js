import {
  ADD_SONG,
  UPVOTE_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  SET_STATE
} from '../common/constants/ActionTypes';

const https = require('https');

export const initialState = {
  queue: { songlist: [], currentSong: null, isPlaying: false },
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

  // Temporary will fix this stuff
  song.artist = null;
  song.duration = null;
  song.src = null;
  song.title = null;
  song.uploadDate = null;
  song.upvotes = 0;
  song.thumbnail = null;

  // key has to be passed in as an environment varibale
  // Example: YOUTUBE_API=aksdfjalksdfjalskdfjlk npm start

  const callAPIURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='
                 + song.vid + '&key=' + process.env.YOUTUBE_API;

  // This won't work for any song that was added in server.js
  https.get(callAPIURL, function(res) {
    let data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      const youTubeSongData = JSON.parse(data);
      song.artist = youTubeSongData.items[0].snippet.channelTitle;
      song.duration = youTubeSongData.items[0].contentDetails.duration;
      song.title = youTubeSongData.items[0].snippet.title;
      song.uploadDate = youTubeSongData.items[0].snippet.publishedAt;
      song.thumbnail = youTubeSongData.items[0].snippet.thumbnails.default.url;
      console.log(song);
      return song;
    });
  });

  return song;
}

function queueReducer(state = initialState.queue, action) {
  const queueSonglist = state.songlist;
  const currentSong = state.currentSong;
  switch (action.type) {
  case ADD_SONG:
    const song = updateSong(action.url);
    if (!currentSong || Object.keys(currentSong).length === 0) {
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
    return {
      ...state,
      songlist: [
        ...queueSonglist.slice(0, action.index),
        Object.assign({}, queueSonglist[action.index],
          {
            upvotes: queueSonglist[action.index].upvotes + 1
          }),
        ...queueSonglist.slice(action.index + 1)
      ].sort((a, b) => b.upvotes - a.upvotes)
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
    if (currentSong && Object.keys(currentSong).length !== 0 ) {
      let nextSong = {};
      if (queueSonglist.length > 0) {
        nextSong = queueSonglist[0];
      }

      newState = {
        ...state,
        queue: {currentSong: nextSong, songlist: queueSonglist.slice(1)},
        history: {songlist:
        [
          ...historySonglist,
          currentSong
        ]}
      };
    }
    return newState;
  default:
    return {
      ...initialState,
      queue: queueReducer(queue, action),
      history
    };
  }
}
