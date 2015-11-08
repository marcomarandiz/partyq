import * as types from '../constants/ActionTypes';

export function upvoteSong(index) {
  return {
    type: types.UPVOTE_SONG,
    index
  };
}
