/*
 * @Description: 
 * @Date: 2021-06-01 01:07:09
 * @LastEditTime: 2021-06-02 00:23:45
 * @LastEditors: linwei
 */

/**
高阶函数，函数作为参数
 * 
 */
// function forEach (array, fn) {
//   // fn是函数，作为参数传入，用于处理数组中的每一项，具体怎么处理，不关心
//   for(let i = 0; i < array.length; i++){
//     fn(array[i]);
//   }
// }

// // 测试
// let arr = [1, 2, 3, 4];
// forEach(arr, function (item) {
//   console.log(item);
// })



// // filter
// function filter(array, fn) {
//   let results = [];
//   for(let i = 0; i < array.length; i++){
//     // 满足条件的记录
//     if(fn(array[i])) {
//       results.push(array[i]);
//     }
//   }
//   return results;
// }

// // 测试
// let arr = [1, 2, 3, 4];
// const newArr = filter(arr, function (item) {
//   return item > 2;
// })
// console.log(newArr);


/**
 * 高阶函数，函数作为返回值
 */
// function makeFn() {
//   let msg = 'hello function';
//   return function() {
//     console.log(msg);
//   }
// }

// const fn = makeFn();
// fn();
// makeFn()();

/**
 * 模拟 loadsh 的 once 函数，让某个函数经过 once 处理后，只能调用一次
 * 场景：调用支付接口的时候，只能调用一次
 * @param {*} fn 待处理的函数
 * @returns 新函数，内部第 fn 的调用只有一次
 */
// function once(fn) {
//   let done = false;
//   return function() {
//     if(!done){
//       done = true;
//       return fn.apply(this, arguments); // arguments 新函数的参数
//     }
//   }
// }

// let pay = once(function(money) {
//   console.log(`支付了：${money}`)
// })

// pay(5);
// pay(5);
// pay(5);


/**
 * 常用高阶函数，map、some、every
 */

// map
// function map(array, fn) {
//   let results = [];
//   for(let item of array) {
//     results.push(fn(item));
//   }
//   return results;
// }
// // 测试
// let arr = [1,2,3];
// let newArr = map(arr, item => item * item);
// console.log(newArr);

// every
// function every(array, fn) {
//   let result = true;
//   for(let item of array) {
//     result = fn(item);
//     if(!result){
//       break; // 有一个元素不满足条件，直接 break
//     }
//   }
//   return result;
// }

// // 测试
// let arr = [1,2,3,4];
// let res = every(arr, v => v > 2);
// console.log(res);

// some
function some(array, fn) {
  let result = false;
  for(let item of array) {
    result = fn(item);
    if(result){
      break;
    }
  }
  return result;
}

// 测试
let arr = [1,2,3,4];
let res = some(arr, v => v > 2);
console.log(res);
