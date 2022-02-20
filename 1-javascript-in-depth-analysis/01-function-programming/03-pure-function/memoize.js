/*
 * @Description: 
 * @Date: 2021-06-03 00:44:41
 * @LastEditTime: 2021-06-03 00:48:09
 * @LastEditors: linwei
 */

// 计算圆面积的纯函数
function getArea(r) {
  console.log('r',r);
  return Math.PI * r * r;
}

function memoize(fn) {
  let cache = {};
  return function () {
    let key = JSON.stringify(arguments); // 将参数数组转为字符串，当做缓存唯一key
    cache[key] = cache[key] || fn.apply(fn, arguments);
    return cache[key];
  }
}

// 带缓存的计算圆面积的纯函数
let getAreaWithMemory = memoize(getArea);
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
