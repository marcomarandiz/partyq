import { ADD_SONG } from '../../common/constants/ActionTypes';

// Returns a songlist sorted by upvotes, descending
export function sortByUpvotes(songlist) {
  return songlist.sort((item1, item2) => item2.upvotes - item1.upvotes);
}

export function callbackAPI(error, song, socket, store, action) {
  if (error) {
    // Send the error back to the client
    socket.emit('add_song_error', error);
    // Log the error since we are not listening anywhere
    console.error(error);
  } else {
    action.type = ADD_SONG;
    action.song = song;
    socket.emit('add_song_success', song);
    store.dispatch.bind(store)(action);
  }
}
