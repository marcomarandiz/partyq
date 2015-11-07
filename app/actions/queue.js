import * as types from '../constants/ActionTypes';

export function addSong(song_name) {
  return {
    type: types.ADD_SONG,
    song: {song_name: song_name, upvotes: 0}
  };
}
