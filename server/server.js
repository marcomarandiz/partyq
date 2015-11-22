import Server from 'socket.io';
import { youtubeAPI, handleAPIError } from './utils/APIcalls.js';

const development = process.env.NODE_ENV !== 'production';

export default function startServer(store) {
  const io = new Server().attach(8090);

  const partyq = io.of('/partyq');

  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => partyq.emit('state', store.getState())
  );

  // store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=nfWlot6h_JM'});
  // store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=4d2lGAP5xvQ'});
  // store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=PhRa3REdozw'});
  // Upvoting in here currently breaks ADD_SONG pulling info from youtube
  // store.dispatch({type: 'UPVOTE_SONG', index: 0});

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

      // Checks if action is 'ADD_SONG' and if it is
      // it calls the youtubeAPI and if it is and makes
      // a callback to handle errors or dispatch the song
      if (action.type === 'ADD_SONG') {
        youtubeAPI(action.url, action.vid, (error, song) => {
          if (error) {
            handleAPIError(error);
          } else {
            action.song = song;
            store.dispatch.bind(store)(action);
          }
        });
      } else {
        store.dispatch.bind(store)(action);
      }
    });
  });
}
