import { DECREMENT, INCREMENT } from "../constant/Counter.constant";

const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case INCREMENT:
      return {...state, count: state.count + 1};
    case DECREMENT:
      return {...state, count: state.count - 1};
    default:
      return {...state};
  }
}

export default reducer;