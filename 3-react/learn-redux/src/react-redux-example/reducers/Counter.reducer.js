
/**
 * 普通方式定义 reducer
 */
// import { DECREMENT, INCREMENT } from "../constant/Counter.constant";

// const initialState = {
//   count: 0,
// }

// const counterReducer = (state = initialState, action) => {
//   const { type } = action;
//   switch (type) {
//     case INCREMENT:
//       return {...state, count: state.count + 1};
//     case DECREMENT:
//       return {...state, count: state.count - 1};
//     default:
//       return {...state};
//   }
// }

// export default counterReducer;


/**
 * 借助 redux-actions， 简化 reducer 定义
 */
import { handleActions } from 'redux-actions';
import { decrement, increment } from '../actions/Counter.action';

const initialState = {
  count: 0,
}

const counterReducer = handleActions({
  // 传入 action，这样就简化了同时在 reducer 和 action 都需要引入常量 type 的操作（其实也可以传入常量 type）
  [increment]: (state, action) => ({...state, count: state.count + 1}),
  [decrement]: (state, action) => ({...state, count: state.count - 1})
}, initialState)

export default counterReducer;