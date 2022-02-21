import { createStore } from 'redux'

const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    default:
      return {...state};
  }
}

const store = createStore(reducer);

export default store;