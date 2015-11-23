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
