import * as types from '../constants/ActionTypes';

export function playSong() {
  return {
    type: types.PLAY_SONG
  };
}

export function pauseSong() {
  return {
    type: types.PAUSE_SONG
  };
}
