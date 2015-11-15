import Server from 'socket.io';
import {setState} from './reducer';

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
    //socket.on('action', store.dispatch.bind(store));

    // Update all the clients' state
    socket.on('state', state => {
      store.dispatch(setState(state));
    });
  });
}
