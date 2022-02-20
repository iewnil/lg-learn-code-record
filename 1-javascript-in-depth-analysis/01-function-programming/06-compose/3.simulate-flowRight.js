/*
 * @Description: 
 * @Date: 2021-06-06 19:00:56
 * @LastEditTime: 2021-06-06 22:50:44
 * @LastEditors: linwei
 */
// 模拟 lodash 中的 flowRight 函数

/**
 * 分析：
 *  1. 需要接收一个函数数组
 *  2. 返回一个组合函数
 *    2.1 组合函数接收第一个执行函数需要的初始值
 *    2.2 函数数组执行顺序：从右到左（reverse）
 *    2.3 组合函数返回函数数组中所有函数依次执行（reduce）后的最终值
 * 
 */

const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase();


function compose(...args) {
  // 返回一个组合函数
  return function(initVal) {
    // 执行顺序需要从右到左，所以进行 reverse 翻转，然后 reduce 依次执行数组中每个函数
    return args.reverse().reduce(function(beforeVal, nextFn) {
      // 将上一个函数执行返回的结果 beforeVal 传入下一个函数 
      return nextFn(beforeVal);
    }, initVal) // initVal 执行第一个函数时的传入值
  }
}

// const f = compose(toUpper, first, reverse);
// console.log(f(['one', 'two', 'three']));


// 结合律
const f = compose(compose(toUpper,first),reverse)
const f2 = compose(toUpper,compose(first,reverse))
console.log(f(['one', 'two', 'three']));
console.log(f2(['one', 'two', 'three']));