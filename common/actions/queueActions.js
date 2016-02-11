import * as types from '../constants/ActionTypes';

export function addSong(song) {
  return {
    type: types.ADD_SONG,
    song
  };
}

export function addSongRequest(url, src) {
  return {
    type: types.ADD_SONG_REQUEST,
    url,
    src
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
