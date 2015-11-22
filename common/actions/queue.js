import * as types from '../constants/ActionTypes';

export function addSong(url) {
  return {
    type: types.ADD_SONG,
    url
  };
}
