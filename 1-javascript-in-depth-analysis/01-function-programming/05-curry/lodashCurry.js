/*
 * @Description:  lodash 的 curry
 * @Date: 2021-06-04 00:35:09
 * @LastEditTime: 2021-06-06 00:55:36
 * @LastEditors: linwei
 */
// const _ = require('lodash');

// function getSum(a, b, c) {
//   return a + b + c;
// }

// const curriedFn = _.curry(getSum);

// console.log(curriedFn(1,2,3)) // 6，直接返回结果
// console.log(typeof curriedFn(1)) // 返回新函数，等待剩余参数传入
// console.log(curriedFn(1)(2,3)) // 6，过程中执行了两次函数
// console.log(curriedFn(1,2)(3)) // 6，过程中执行了两次函数 


/**
 * 优化封装带基准值的函数过程（index.js中）
 */
// const _ = require('lodash');

// function checkAge (mini,age) {
//   return age >= mini;
// }

// const curriedCheckAge = _.curry(checkAge);
// const checkAge18 = curriedCheckAge(18);


/**
 * 在 filter 基础上封装业务函数
 */
const _ = require('lodash');

const curriedFilter = _.curry(function(fn, arr) {
	return arr.filter(fn);
})

// 过滤不满足数组中小于5的数 
function lessThanFive(num) {
	return num <= 5
}

const filterLT5 = curriedFilter(lessThanFive);

console.log(filterLT5([1,2,3,4,5,6,7]));