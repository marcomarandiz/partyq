import * as types from '../constants/ActionTypes';

export function addSong(url) {
  return {
    type: types.ADD_SONG,
    url
  };
}

export function nextReady() {
  return {
    type: types.NEXT_READY
  };
}
