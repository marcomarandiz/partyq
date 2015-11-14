import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import io from 'socket.io-client';
import reducer from './reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090/entries`);
socket.on('state', state => {
  store.dispatch({type: 'SET_STATE', state});
});

store.dispatch({type: 'ADD_SONG', song: 'https://www.youtube.com/watch?v=nfWlot6h_JM'});
store.dispatch({type: 'ADD_SONG', song: 'https://www.youtube.com/watch?v=4d2lGAP5xvQ'});
store.dispatch({type: 'ADD_SONG', song: 'https://www.youtube.com/watch?v=PhRa3REdozw'});
console.log(store.getState());
store.dispatch({type: 'UPVOTE_SONG', index: 1});
console.log(store.getState());
store.dispatch({type: 'PLAY_SONG'});
console.log(store.getState());
store.dispatch({type: 'PAUSE_SONG'});
console.log(store.getState());
// store.dispatch({type: 'NEXT_SONG'});
// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
