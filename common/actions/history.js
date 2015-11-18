import * as types from '../constants/ActionTypes';

export function reAddSong(index) {
  return {
    type: types.ADD_SONG_FROM_HISTORY,
    index
  };
}
