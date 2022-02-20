/*
 * @Description: 
 * @Date: 2021-06-06 16:37:29
 * @LastEditTime: 2021-06-06 16:37:50
 * @LastEditors: linwei
 */

// 函数组合初识

function compose(f, g) {
	return function(value) {
    return f(g(value))
  }
}

function reverse(arr) {
  return arr.reverse();
}

function first(arr) {
	return arr[0];
}

const last = compose(first, reverse);
console.log(last([1,2,3,4]));