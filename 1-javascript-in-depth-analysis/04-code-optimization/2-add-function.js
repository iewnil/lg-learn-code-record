/*
 * @Description:  添加附加方法
 * @Date: 2021-08-08 10:03:12
 * @LastEditTime: 2021-08-08 10:05:30
 * @LastEditors: linwei
 */

// 构造函数添加方法
var fn1 = function() {
  this.foo = function () {
    console.log('foo');
  }
}

let f1 = new fn1();

// 通过原型对象添加附加方法
var fn2 = function() {}
fn2.prototype.foo = function() {
  console.log('foo');
}

let f2 = new fn2();