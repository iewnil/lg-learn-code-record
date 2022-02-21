import { createStore } from 'redux'
import reducer from '../reducers/Counter.reducer';

const store = createStore(reducer);

export default store;