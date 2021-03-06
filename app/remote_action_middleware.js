import {SET_STATE} from '../common/constants/ActionTypes';

export default socket => store => next => action => {
  if (action.type !== SET_STATE) {
    socket.emit('action', action);
  }

  return next(action);
};
