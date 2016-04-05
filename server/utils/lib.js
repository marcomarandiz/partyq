import { ADD_SONG, UPVOTE_SONG } from '../../common/constants/ActionTypes';
import { songInQueue, getSidFromUrl } from '../../common/utils/functions';
import { YouTube, SoundCloud } from '../../common/constants/SourceTypes';
import { youtubeAPI, soundcloudResolveAPI, soundcloudGetSongAPI } from './APIcalls';
import { addSongToDatabase } from './sqllib';
import moment from 'moment';

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
  if (path === '/') {
    return 'default';
  }
  return path;
}

export function cleanupSong(song) {
  // Youtube's API doesn't handle duration properly for videos longer than an hour
  // It always uses MM:SS
  switch (song.src) {
  case YouTube:
    const durationSplit = song.duration.split(':');
    song.duration = parseInt(durationSplit[0], 10) * 60 + parseInt(durationSplit[1], 10);
    break;
  case SoundCloud:
    song.duration = Math.ceil(moment.duration(song.duration).asSeconds());
    break;
  default:
  }
  return song;
}

export function handleAddSongYoutube(action, socket, store) {
  // Get sid from url
  const sid = getSidFromUrl(action.url);

  // Check if song is in queue
  if (!dispatchUpvoteIfSongInQueue(action, sid, socket, store)) {
    // Check if song is in database
    youtubeAPI(action.url, (error, song) => {
      if (error) {
        console.log('Error with youtubeAPI', error);
        callbackApiError(error, socket, store);
      } else {
        const cleanSong = cleanupSong(song);
        addSongToDatabase(cleanSong, action.roomname);
        callbackApiSuccess(cleanSong, action, socket, store);
      }
    });
  }
}

export function handleAddSongSoundcloud(action, socket, store) {
  soundcloudResolveAPI(action.url, (error, resolvedUrl) => {
    if (error) {
      console.log('Error with soundcloud resolve song api', error);
      callbackApiError(error, socket, store);
    } else if (!dispatchUpvoteIfSongInQueue(action, getSidFromUrl(resolvedUrl), socket, store)) {
      soundcloudGetSongAPI(resolvedUrl, (getSongError, song) => {
        if (getSongError) {
          console.log('Error with soundcloud get song api', error);
          callbackApiError(error, socket, store);
        } else {
          const cleanSong = cleanupSong(song);
          addSongToDatabase(cleanSong, action.roomname);
          callbackApiSuccess(cleanSong, action, socket, store);
        }
      });
    }
  });
}
