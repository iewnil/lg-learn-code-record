import { combineReducers } from 'redux'
import counterReducer from '../reducers/Counter.reducer';

// combineReducers用于reducers独立拆分合并
const rootReducer = combineReducers({
  counter: counterReducer
})

export default rootReducer;