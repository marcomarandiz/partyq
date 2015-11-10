import * as types from '../constants/ActionTypes';

export default function playSong() {
  return {
    type: types.PLAY_SONG
  };
}

export default function pauseSong() {
  return {
    type: types.PAUSE_SONG
  };
}
