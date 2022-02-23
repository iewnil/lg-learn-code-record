const logger = store => next => action => {
  console.log('store: ', store);
  console.log('action: ', action);
  next(action);
};

export default logger;