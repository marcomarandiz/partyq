import { ADD_SONG, UPVOTE_SONG } from '../../common/constants/ActionTypes';
import { songInQueue } from '../../common/utils/functions';

// Returns a songlist sorted by upvotes, descending
export function sortByUpvotes(songlist) {
  return songlist.sort((item1, item2) => item2.upvotes - item1.upvotes);
}

export function callbackApiSuccess(song, action, socket, store) {
  const result = {
    song: song
  };
  action.type = ADD_SONG;
  action.song = song;
  store.dispatch.bind(store)(action);
  socket.emit('add_song_result', result);
}

export function callbackApiError(error, socket, store) {
  const result = {
    error: error
  };
  console.error(error);
  socket.emit('add_song_result', result);
}

// If song in queue it upvotes and returns true otherwise returns false
export function dispatchUpvoteIfSongInQueue(action, songId, socket, store) {
  const index = songInQueue(store.getState()[action.roomname].queue, songId);
  const result = {};
  action.type = UPVOTE_SONG;
  action.index = index;
  if (index >= 0) {
    result.error = 'Song already in queue, upvoting instead.';
    socket.emit('add_song_result', result);
    store.dispatch.bind(store)(action);
    return true;
  } else if (index === -2) {
    result.error = 'Song already playing.';
    socket.emit('add_song_result', result);
    return true;
  }
  return false;
}

export function pathToRoomName(path) {
  return 'default';
}
