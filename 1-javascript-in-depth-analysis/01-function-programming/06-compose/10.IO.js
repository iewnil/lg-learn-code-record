/*
 * @Description:  IO函子
 * @Date: 2021-06-12 17:56:38
 * @LastEditTime: 2021-06-12 18:34:48
 * @LastEditors: linwei
 */
const fp = require('lodash/fp');

class IO {
  static of(x) {
    return new IO(function () {
      return x;
    })
  }

  constructor (fn) {
    this._value = fn;
  }

  map(fn) {
    // 返回一个新的IO函子，且新的IO函子的值是一个组合函数，把当前传入的函数fn暂缓执行
    return new IO(fp.flowRight(fn, this._value));
  }
}

let r = IO.of(process).map(p => p.execPath);
console.log(r);
console.log(r._value());