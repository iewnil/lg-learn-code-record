import { all } from 'redux-saga/effects';
import counterSaga from './Counter.saga';

export default function* rootSaga() {
  yield all([
    counterSaga(), // 注：这里是函数调用的结果
  ])
}