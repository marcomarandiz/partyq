import Server from 'socket.io';
import { ADD_SONG_REQUEST } from '../common/constants/ActionTypes';
import { YouTube, SoundCloud } from '../common/constants/SourceTypes';
import { createRoom } from '../common/actions/roomActions';
import { getVidFromUrl } from '../common/utils/functions';
import { youtubeAPI,
         soundcloudResolveAPI,
         soundcloudGetSongAPI } from './utils/APIcalls';
import { callbackApiSuccess,
         callbackApiError,
         dispatchUpvoteIfSongInQueue,
         pathToRoomName } from './utils/lib';

export default function startServer(store) {
  const io = new Server().attach(8090);

  const partyq = io.of('/partyq');

  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => {
      const lastroom = store.getState().lastroom;
      partyq.to(lastroom).emit('state', store.getState()[lastroom]);
    }
  );

  partyq.on('connection', (socket) => {
    const pathname = socket.handshake.query.path;
    const roomname = pathToRoomName(pathname);
    // Get the path from the socket's window.location.pathname

    if (!(roomname in store.getState())) {
      socket.emit('owner', roomname);
      store.dispatch(createRoom(roomname));
    }
    socket.join(roomname);
    partyq.to(roomname).emit('state', store.getState()[roomname]);

    // Feed action event from clients directly into store
    // Should probably put authentication here
    socket.on('action', (action) => {

      // Attach the remote address as id so we know who performed the actions
      // If we are in production, use the ip address
      // If we are developing, use the socket id
      action.id = socket.id;

      // TODO: update to actual room name
      action.roomname = roomname;

      // Checks if action is 'ADD_SONG_REQUEST' and if it is
      // it calls the youtubeAPI and if it is and makes
      // a callback to handle errors or dispatch the song.
      // If action is not ADD_SONG_REQUEST it just
      // dispatches the action.
      if (action.type === ADD_SONG_REQUEST) {
        switch (action.src) {
        case YouTube:
          if (!dispatchUpvoteIfSongInQueue(action, getVidFromUrl(action.url), socket, store)) {
            youtubeAPI(action.url, (error, song) => {
              if (error) {
                callbackApiError(error, socket, store);
              } else if (song) {
                callbackApiSuccess(song, action, socket, store);
              }
            });
          }
          break;
        case SoundCloud:
          soundcloudResolveAPI(action.url, (error, resolvedUrl) => {
            if (error) {
              callbackApiError(error, socket, store);
            } else if (resolvedUrl) {
              soundcloudGetSongAPI(resolvedUrl, (err, song) => {
                if (err) {
                  callbackApiError(err, socket, store);
                } else {
                  if (!dispatchUpvoteIfSongInQueue(action, song.vid, socket, store)) {
                    callbackApiSuccess(song, action, socket, store);
                  }
                }
              });
            }
          });
          break;
        default:
          console.log('How did you get this source?' + action.src);
        }
      } else {
        console.log(action);
        store.dispatch.bind(store)(action);
      }
    });
  });
}
