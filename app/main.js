import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import io from 'socket.io-client';
import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import remoteActionMiddleware from './remote_action_middleware';
import setState from '../common/actions/setstate';

const socket = io(`${location.protocol}//${location.hostname}:8090/partyq`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
  store.dispatch(setState(state));
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
