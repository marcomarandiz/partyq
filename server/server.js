import Server from 'socket.io';
import { youtubeAPI, soundcloudAPI } from './utils/APIcalls';
import { ADD_SONG_REQUEST } from '../common/constants/ActionTypes';
import { YouTube, SoundCloud } from '../common/constants/SourceTypes';
import { callbackAPI } from './utils/lib';

const development = process.env.NODE_ENV !== 'production';

export default function startServer(store) {
  const io = new Server().attach(8090);

  const partyq = io.of('/partyq');

  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => partyq.emit('state', store.getState())
  );

  partyq.on('connection', (socket) => {
    socket.emit('state', store.getState());
    // Feed action event from clients directly into store
    // Should probably put authentication here
    socket.on('action', (action) => {

      // Attach the remote address as id so we know who performed the actions
      // If we are in production, use the ip address
      // If we are developing, use the socket id
      action.id = development ? socket.id :
        socket.request.connection.remoteAddress;

      // Checks if action is 'ADD_SONG_REQUEST' and if it is
      // it calls the youtubeAPI and if it is and makes
      // a callback to handle errors or dispatch the song
      if (action.type === ADD_SONG_REQUEST) {
        switch (action.src) {
        case YouTube:
          youtubeAPI(action.url, (error, song) => {
            callbackAPI(error, song, socket, store, action);
          });
          break;
        case SoundCloud:
          soundcloudAPI(action.url, (error, song) => {
            callbackAPI(error, song, socket, store, action);
          });
          break;
        default:
          console.log('How did you get this source?' + action.src);
        }
      } else {
        store.dispatch.bind(store)(action);
      }
    });
  });
}
