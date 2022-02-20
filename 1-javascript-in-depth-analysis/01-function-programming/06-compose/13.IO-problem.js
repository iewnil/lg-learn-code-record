/*
 * @Description:  IO 函子嵌套问题
 * @Date: 2021-06-12 23:37:05
 * @LastEditTime: 2021-06-12 23:56:28
 * @LastEditors: linwei
 */
const fp = require('lodash/fp');
const fs = require('fs');

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

let readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  })
}

let print = function (x) {
  return new IO(function () {
    console.log('print', x);
    return x;
  })
}

// IO(IO(x))
let f = fp.flowRight(print, readFile);

// 返回 readFile的函子，readfile 被延迟执行
console.log(f('package.json')); 
// 执行 readFile 的函子，返回 print 的函子， print 被延迟执行
console.log(f('package.json')._value())
// 执行 print 的函子，输出结果
console.log(f('package.json')._value()._value())
