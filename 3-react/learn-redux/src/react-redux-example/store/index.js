import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from '../middlewares/logger';
import counterReducer from '../reducers/Counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer
})

const middlewares = applyMiddleware(logger);

const store = createStore(rootReducer, middlewares);

export default store;