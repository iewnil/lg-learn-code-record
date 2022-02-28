const logger = store => next => action => {
  console.log('store: ', store);
  console.log('action: ', action);
  // store：中间件接收到的 store 是阉割版的，只有 dispatch 和 getState
  // next 函数其实是：
  // 1.下一个中间件最里层返回的那个函数 (action)=> {}
  // 2. 最后一个中间件的 next 其实是 dispatch 
  next(action);
};

export default logger;