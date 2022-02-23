const thunk = store => next => action => {
  if(typeof action === 'function') {
    const { dispatch } = store;
    return action(dispatch);
  }
  next(action);
}

export default thunk;