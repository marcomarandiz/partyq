export default socket => store => next => action => {
  if (action !== 'SET_STATE') {
    socket.emit('action', action);
    return next(action);
  }
  return next(action);
};
