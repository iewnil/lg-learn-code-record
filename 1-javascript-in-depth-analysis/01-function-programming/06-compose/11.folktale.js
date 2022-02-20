/*
 * @Description: 
 * @Date: 2021-06-12 18:48:43
 * @LastEditTime: 2021-06-12 19:08:46
 * @LastEditors: linwei
 */
const { compose, curry } = require('folktale/core/lambda');
const { toUpper, first } = require('lodash/fp');

// 第一个参数
let f1 = curry(2, (x, y) => {
  return x + y;
});

console.log(f1(1, 2));
console.log(f1(1)(2));


let f2 = compose(toUpper, first);
console.log(f2(['one', 'two']));