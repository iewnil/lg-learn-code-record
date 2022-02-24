import { takeEvery, put, delay } from 'redux-saga/effects';
import { increment } from '../actions/Counter.action';
import { INCREMENT_ASYNC } from '../constant/Counter.constant';

function* increment_async_fn() {
  // 模拟异步操作，延迟两秒
  yield delay(2000);
  // 异步操作结束后，通过 put 调用同步的 action，进行同步更改数据操作（类似 dispatch）
  yield put(increment());
}

export default function* counterSaga() {
  // 将此异步 action 与 sage 的异步操作绑定，即触发此 异步action 时，会执行 saga的内容
  yield takeEvery(
    INCREMENT_ASYNC, 
    increment_async_fn
  )
}