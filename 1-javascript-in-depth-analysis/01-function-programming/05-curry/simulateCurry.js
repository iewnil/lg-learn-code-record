/*
 * @Description: 
 * @Date: 2021-06-06 14:43:55
 * @LastEditTime: 2021-06-06 15:15:03
 * @LastEditors: linwei
 */

/**
 * 分析：
 *  1. 需要接收一个需要被柯里化的函数 fn
 *  2. 返回一个被柯里化的新函数 curriedFn
 *  3. 根据传入 curriedFn 参数的个数（理论上小于等于 fn 的参数个数），来决定执行后返回的结果
 *    3.1 大于等于 fn 参数个数： curriedFn 执行返回的结果，就相当于 fn 执行的结果
 *    3.2 小于 fn 参数个数：curriedFn 执行返回一个新的函数 newFn，等待接收剩余参数，并递归执行 curriedFn
 *        注意：这一步递归执行 curriedFn，其实就是将已传入的参数 和 待接收的参数进行拼接，等参数个数达到 fn 参数个数后，就会执行 fn 返回结果了
 */

function curry(fn) {
  return function curriedFn(...args) {
    // 传入 curriedFn 参数的个数小于 fn 参数个数
    if(args.length < fn.length){
      // 返回一个新的函数 newFn
      return function() {
        // 递归执行 curriedFn，因为 agguments 为类数组，需要通过 Array.from 来转换
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }

    // 传入 curriedFn 参数的个数大于等于 fn 参数个数
    // 将所有参数传入 fn 直接执行返回
    return fn(...args);
  }
}

function getSum(a, b, c) {
  return a + b + c;
}

const curriedFn = curry(getSum);

console.log(curriedFn(1,2,3,4)) // 6，直接返回结果
console.log(curriedFn(1,2,3)) // 6，直接返回结果
console.log(typeof curriedFn(1)) // 返回新函数，等待剩余参数传入
console.log(curriedFn(1)(2,3)) // 6，过程中执行了两次函数
console.log(curriedFn(1,2)(3)) // 6，过程中执行了两次函数 