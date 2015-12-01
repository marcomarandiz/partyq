import * as types from '../constants/ActionTypes';

export function nextSong() {
  return {
    type: types.NEXT_SONG
  };
}

export function upvoteSong(index) {
  return {
    type: types.UPVOTE_SONG,
    index
  };
}

export function setOwner(id) {
  return {
    type: types.SET_OWNER,
    id
  };
}
