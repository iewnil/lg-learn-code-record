/**
 * 自定义中间件，以及 redux-thunk 使用
 */
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import logger from '../middlewares/logger';
// // import thunk from '../middlewares/thunk';
// import thunk from 'redux-thunk';
// import counterReducer from '../reducers/Counter.reducer';

// const rootReducer = combineReducers({
//   counter: counterReducer
// })

// const middlewares = applyMiddleware(logger, thunk);

// const store = createStore(rootReducer, middlewares);

// export default store;

/**
 * react-saga 使用
 */
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;