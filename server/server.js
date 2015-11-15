import Server from 'socket.io';
import {setState} from './reducer';

export default function startServer(store) {
  const io = new Server().attach(8090);

  const partyq = io.of('/partyq');

  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => partyq.emit('state', store.getState())
  );

  store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=nfWlot6h_JM'});
  store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=4d2lGAP5xvQ'});
 store.dispatch({type: 'ADD_SONG', url: 'https://www.youtube.com/watch?v=PhRa3REdozw'});
  store.dispatch({type: 'UPVOTE_SONG', index: 0});

  partyq.on('connection', (socket) => {
    socket.emit('state', store.getState());

    // Feed action event from clients directly into store
    // Should probably put authentication here
    socket.on('action', store.dispatch.bind(store));
  });
}
