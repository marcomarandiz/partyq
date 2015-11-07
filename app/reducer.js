import { combineReducers } from 'redux';
import { ADD_SONG } from './constants/ActionTypes';

function queueSonglist(state = [], action) {
  switch (action.type) {
  case ADD_SONG:
    return [
      ...state,
      {song_name: action.song, upvotes: 0}
    ];
  default:
    return state;
  }
}

const partyqApp = combineReducers({
  queueSonglist
});

export default partyqApp;
