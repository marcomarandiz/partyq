import * as types from '../constants/ActionTypes';

export function addSong(song) {
  return {
    type: types.ADD_SONG,
    song: song
  };
}
