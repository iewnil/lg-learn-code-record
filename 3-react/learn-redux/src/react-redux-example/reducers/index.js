import { combineReducers } from 'redux'
import counterReducer from '../reducers/Counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer
})

export default rootReducer;