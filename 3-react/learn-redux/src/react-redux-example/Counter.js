/**
 * 普通写法
 */

// import React from 'react';
// import { connect } from 'react-redux';
// import { DECREMENT, INCREMENT } from './constant/Counter.constant';

// const Counter = (props) => {

//   const {
//     count,
//     increment,
//     decrement,
//   } = props;

//   return (
//     <div>
//       <button onClick={() => increment()}>+</button>
//       <span>{count}</span>
//       <button onClick={() => decrement()}>-</button>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   count: state.count,
// })

// // 普通写法
// const mapDispatchToProps = (dispatch) => ({
//   increment() {
//     dispatch({ type: INCREMENT })
//   },
//   decrement() {
//     dispatch({ type: DECREMENT })
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);


/**
 * 使用 bindActionCreators 重构 actions 后的写法
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/Counter.action';

const Counter = (props) => {

  const {
    count,
    increment,
    decrement,
    increment_async,
  } = props;

  return (
    <div>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => increment_async()}>async +</button>
      <span>{count}</span>
      <button onClick={() => decrement()}>-</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.counter.count,
})

// bindActionCreators 写法，简化 mapDispatchToProps 定义，自动帮我们绑定 dispatch 与 action 对象
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);