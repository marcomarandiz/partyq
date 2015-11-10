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

store.dispatch({type: 'ADD_SONG', song: 'redux-song'});
store.dispatch({type: 'ADD_SONG', song: 'second'});
console.log(store.getState());
store.dispatch({type: 'UPVOTE_SONG', index: 1});
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
