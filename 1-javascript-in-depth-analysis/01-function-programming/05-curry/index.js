/*
 * @Description: 函数柯里化
 * @Date: 2021-06-03 23:37:34
 * @LastEditTime: 2021-06-03 23:51:33
 * @LastEditors: linwei
 */

// 上一节的普通纯函数
function checkAge (mini,age) {
  return age >= mini;
}

console.log(checkAge(18,20))
console.log(checkAge(18,21))
console.log(checkAge(18,22))

// 多次调用每次都要传入 18，如果这个18很经常用，则可以设为基准值
// 改进：
function checkAge(mini) {
  return function(age) {
    return age >= mini;
  }
}
// ES6 写法
const checkAge = mini => (age => age >= mini)

const checkAge18 = checkAge(18);

console.log(checkAge18(20))
console.log(checkAge18(21))
console.log(checkAge18(22))
