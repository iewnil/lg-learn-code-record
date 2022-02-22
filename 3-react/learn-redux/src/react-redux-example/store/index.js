import { createStore, combineReducers } from 'redux'
import counterReducer from '../reducers/Counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer
})

const store = createStore(rootReducer);

export default store;