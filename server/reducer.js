import {
  ADD_SONG,
  UPVOTE_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  SET_STATE,
  ADD_SONG_FROM_HISTORY
} from '../common/constants/ActionTypes';
import { youtubeAPI } from './utils/APIcalls.js';
import { isLinkValid, getVidFromUrl } from '../common/utils/functions.js';
import moment from 'moment';

export const initialState = {
  queue: { songlist: [], currentSong: {}, isPlaying: true },
  history: { songlist: []}
};

function queueReducer(state = initialState.queue, action) {
  const queueSonglist = state.songlist;
  const currentSong = state.currentSong;
  const userid = action.id;
  switch (action.type) {
  case ADD_SONG:
    if (!isLinkValid(action.url)) {
      return state;
    }
    const song = youtubeAPI(action.url, getVidFromUrl(action.url));
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
    if (Object.keys(currentSong).length !== 0 ) {
      const songEndMoment = moment();
      currentSong.endedAt = songEndMoment.format('dddd h:mm a');
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
