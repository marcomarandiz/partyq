export const ADD_SONG = 'ADD_SONG';

export function addSong(song) {
  return {
    type: ADD_SONG,
    song: song
  };
}
