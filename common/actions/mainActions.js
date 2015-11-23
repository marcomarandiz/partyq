import * as types from '../constants/ActionTypes';

export function nextSong() {
  return {
    type: types.NEXT_SONG
  };
}

export function reAddSong(index) {
  return {
    type: types.ADD_SONG_FROM_HISTORY,
    index
  };
}

export function upvoteSong(index) {
  return {
    type: types.UPVOTE_SONG,
    index
  };
}
