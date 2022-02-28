function thunk (stroe) {
  return function (next) {
    return function (action) {
      console.log('thunk')
      next(action);
    }
  }
}