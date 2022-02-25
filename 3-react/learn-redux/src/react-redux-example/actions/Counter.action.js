import { DECREMENT, INCREMENT, INCREMENT_ASYNC } from "../constant/Counter.constant";


/**
 * 普通方式定义 action
 */
// export const increment = () => ({
//   type: INCREMENT
// })

// export const decrement = () => ({
//   type: DECREMENT
// })

// // 异步 action，用于 thunk 中间件的编写形式
// // // 存在问题：action 是一个函数，异步操作写在 action 中，导致 action 不像之前单纯对象那么纯粹了
// // export const increment_async = (payload) => (dispatch) => {
// //   setTimeout(() => {
// //     dispatch(increment(payload));
// //   }, 2000);
// // }

// // 异步 action，使用 redux-saga 后，和同步 action 一样简洁了
// export const increment_async = () => ({
//   type: INCREMENT_ASYNC
// })

/**
 * 借助 redux-actions，简化 action 定义
 */
import { createAction } from 'redux-actions';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const increment_async = createAction(INCREMENT_ASYNC);