export default store => next => action => {
  console.log('in middleware', action, store);
  return next(action);
};
