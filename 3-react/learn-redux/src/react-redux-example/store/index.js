import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from '../middlewares/logger';
import thunk from '../middlewares/thunk';
import counterReducer from '../reducers/Counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer
})

const middlewares = applyMiddleware(logger, thunk);

const store = createStore(rootReducer, middlewares);

export default store;