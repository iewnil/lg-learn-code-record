/*
 * @Description: 
 * @Date: 2021-06-13 00:03:37
 * @LastEditTime: 2021-06-13 00:16:59
 * @LastEditors: linwei
 */
const fp = require('lodash/fp');
const fs = require('fs');

class IoMonad {
  static of(x) {
    return new IoMonad(function () {
      return x;
    })
  }

  constructor (fn) {
    this._value = fn;
  }

  map (fn) {
    return new IoMonad(fp.flowRight(fn, this._value));
  }

  join () {
    // 用来解决返回的是函子，将函子内部的值函数直接执行
    return this._value();
  }

  flatMap (fn) {
    return this.map(fn).join();
  }

}

let readFile = function (filename) {
  return new IoMonad(function () {
    return fs.readFileSync(filename, 'utf-8');
  })
}

let print = function (x) {
  return new IoMonad(function () {
    console.log('print', x);
    return x;
  })
}

/**
 * 当 print 是函子时，就需要通过 flapMap ，来拍平 readfile 函子，使其返回的是值
 * 而不是函子，这样 print 函子就接收的是值
 */
let r = readFile('package.json')
          .flatMap(print)
          .join()
console.log(r);