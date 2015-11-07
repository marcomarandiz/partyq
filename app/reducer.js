import { combineReducers } from 'redux';
import { ADD_SONG, UPVOTE_SONG } from './constants/ActionTypes';

function queueSonglist(state = [], action) {
  switch (action.type) {
  case ADD_SONG:
    return [
      ...state,
      {song_name: action.song, upvotes: 0}
    ];
  case UPVOTE_SONG:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], 
        {
          upvotes: state[action.index].upvotes + 1
        }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

const partyqApp = combineReducers({
  queueSonglist
});

export default partyqApp;
