import { createStore, applyMiddleware } from 'redux'
import logger from '../middlewares/logger';
import thunk from '../middlewares/thunk';
import rootReducer from '../reducers';

const middlewares = applyMiddleware(logger, thunk);

const store = createStore(rootReducer, middlewares);

export default store;