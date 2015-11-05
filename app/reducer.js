import {List} from 'immutable';
import { combineReducers } from 'redux';

function queueSonglist(state = List(), action) {
  switch (action.type) {
  case 'ADD_SONG':
    return state.push(action.item);
  default:
    return state;
  }
}

const partyqApp = combineReducers({
  queueSonglist
});

export default partyqApp;
