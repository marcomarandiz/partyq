import {List} from 'immutable';
import { combineReducers } from 'redux';

function queue(state = List(), action) {
  switch (action.type) {
  case 'ADD_SONG':
    return state.push(action.item);
  default:
    return state;
  }
}

const partyqApp = combineReducers({
  queue
});

export default partyqApp;
