function logger (stroe) {
  return function (next) {
    return function (action) {
      console.log('logger')
      next(action);
    }
  }
}