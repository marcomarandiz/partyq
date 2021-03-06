import {
  ADD_SONG,
  UPVOTE_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  SET_STATE,
  NEXT_READY,
  CREATE_ROOM
} from '../common/constants/ActionTypes';
import { sortByUpvotes } from './utils/lib';
import moment from 'moment';

export const initialState = {};

export const roomInitialState = {
  queue: { songlist: [], currentSong: {}, isPlaying: false, nextReady: false },
  history: { songlist: []}
};

function queueReducer(state = roomInitialState.queue, action) {
  const queueSonglist = state.songlist;
  const currentSong = state.currentSong;
  const userid = action.id;
  switch (action.type) {
  case ADD_SONG:
    if (!action.song) {
      return state;
    }
    action.song.upvotes = 1;
    action.song.userUpvotes = [action.id];
    action.song.endedAt = null;
    if (Object.keys(currentSong).length === 0) {
      return {
        ...state,
        currentSong: action.song,
        isPlaying: true
      };
    }
    return {
      ...state,
      songlist: [
        ...queueSonglist,
        action.song
      ]
    };
  case NEXT_READY:
    return {
      ...state,
      nextReady: true
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
      songlist: sortByUpvotes([
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
      ]),
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

function roomReducer(state = roomInitialState, action) {
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
        queue: {
          ...queue,
          nextReady: false,
          isPlaying: isPlaying,
          currentSong: nextSong,
          songlist: queueSonglist.slice(1),
        },
        history: {songlist:
        [
          currentSong,
          ...historySonglist
        ]}
      };
    }
    return newState;
  default:
    return {
      ...roomInitialState,
      queue: queueReducer(queue, action),
      history
    };
  }
}

export default function mainReducer(state = initialState, action) {
  const roomname = action.roomname || 'default';
  switch (action.type) {
  case CREATE_ROOM:
    state[roomname] = roomInitialState;
    return {
      ...state,
      lastroom: roomname
    };
  default:
    state[roomname] = roomReducer(state[roomname], action);
    return {
      ...state,
      lastroom: roomname
    };
  }
}
