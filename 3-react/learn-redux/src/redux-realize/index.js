function createStore (reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if(typeof reducer !== 'function') throw new Error('reducer必须是函数')

  // 判断 enhancer 参数有没有传递
  if(typeof enhancer !== 'undefined') {
    // 判断 enhancer 是不是一个函数
    if(typeof enhancer !== 'function') {
      throw new Error('enhancer必须是函数')
    }

    // 调用 enhancer，传入createStore
    // 返回一个“增强”过的 createStore函数，再进行调用，调用结果实际上返回一个增强过的store
    return enhancer(createStore)(reducer, preloadedState);
  }

  // store 对象中存储的状态
  var currentState = preloadedState;
  // 存放订阅者函数
  var currentListeners = [];

  // 获取状态
  function getState () {
    // 通过闭包形式，一直持有 store 的状态内存
    return currentState;
  }

  // 触发 action
  function dispatch (action) {
    // 判断 action 是否是对象
    if(!isPlainObject(action)) throw new Error('action必须是对象')
    // 判断 action 中是否具有 type 属性
    if(typeof action.type === 'undefined') throw new Error('action对象必须有type属性')

    currentState = reducer(currentState, action);
    // 循环数组，调用订阅者
    for(var i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      var listener = currentListeners[i];
      // 调用订阅者
      listener();
    }
  }

  // 订阅状态
  function subscribe (listener) {
    currentListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 判断 obj 参数是否是对象
function isPlainObject (obj) {
  // 排除基本数据类型和 null
  if(typeof obj !== 'object' || obj === null) return false;
  // 区分数组和对象，原型对象对比的方式
  var proto = obj;
  while(Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  // 对象的原型往上走，只有一层，所以会相等
  // 数组的原型往上走，有两层，所以不相等
  return Object.getPrototypeOf(obj) === proto;
}

// 作用：返回一个 enhancer
function applyMiddleware (...middlewares) {
  return function (createStore) {
    // 作用：返回一个增强后的 createStore 函数（函数内部依次调用中间件）
    return function (reducer, preloadedState) {
      // 创建 store，传给中间件
      var store = createStore(reducer, preloadedState);
      // middlewareAPI 是 阉割版的store：中间件接收到的 store 是阉割版的，只有 dispatch 和 getState 
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      };

      // 调用中间件的第一层函数，传递阉割版的 store，得到第二层函数
      var chain = middlewares.map((middleware) => {
        return middleware(middlewareAPI);
      })

      // 得到最终的 第一个中间件的最里层（第三层）函数
      var dispatch = compose(...chain)(store.dispatch)

      // 增强了 dispatch，调用 dispatch 即相当于，调用一个一个中间件的最里层函数，最后一个中间件调用 dispatch
      return {
        ...store,
        dispatch,
      }
    }
  }
}

// 作用：调用第二层函数，返回一个函数，函数返回 最终的 第一个中间件的最里层（第三层）函数
function compose () {
  var funcs = [...arguments];
  return function (dispatch) {
    // 倒着循环中间件数组，因为最后一个中间件可以先拿到 dispatch，倒数第二个中间件 就可以 拿到最后一个中间件返回的最里层函数作为 next
    for(var i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch); // 调用第二层，返回最里层（第三层）函数，作为 next，用 dispatch 记录
    }
    return dispatch;
  }
}

// 简化 mapDispatchToProps 定义，自动帮我们绑定 dispatch 与 action 对象
function bindActionCreators (actionCreators, dispatch) {
  var boundActionCreators = {};
  for(var key in actionCreators) {
    // 通过立即执行函数，让每一个循环的 key 拥有独立作用域
    (function (key) {
      boundActionCreators[key] = function () {
        dispatch(actionCreators[key]())
      }
    })(key)
  }
  return boundActionCreators;
}

function combineReducers (reducersObj) {
  // 1. 检查 reducer 类型，必须是函数
  var reducerKeys = Object.keys(reducersObj);
  for(var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if(typeof reducersObj[key] !== 'function') throw new Error('reducer必须是函数')
  }

  // 2. 调用一个一个独立的 reducer，得到其状态，并统一存储在大的对象中
  return function (state, action) {
    var reducerState = {};
    
    for(var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i];
      var reducer = reducersObj[key];
      var prevState = state[key];
      reducerState[key] = reducer(prevState, action)
    }

    return reducerState;
  }
}