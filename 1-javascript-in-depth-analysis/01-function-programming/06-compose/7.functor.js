/*
 * @Description: 
 * @Date: 2021-06-09 01:03:52
 * @LastEditTime: 2021-06-09 23:35:49
 * @LastEditors: linwei
 */
/**
 * 函子
 */
// class Container {
// 	constructor (value) {
//   	this._value = value; // 下划线表示此变量为私有的
//   }
	
//   map (fn) {
//   	return new Container(fn(this._value)); // 将fn处理的值传给一个新的函子
//   }
// }

// let r = new Container(5)
// 	.map(x => x + 1)
//   .map(x => x * x) // 因为返回新的函子，所以可以进行链式调用

// console.log(r);

/**
 * 优化 new
 */
class Container {
	constructor (value) {
  	this._value = value; // 下划线表示此变量为私有的
  }

  static of (value) {
    return new Container(value);
  }
	
  map (fn) {
  	return Container.of(fn(this._value)); // 将fn处理的值传给一个新的函子
  }
}

let r = Container.of(undefined)
	.map(x => x + 1)
  .map(x => x * x) // 因为返回新的函子，所以可以进行链式调用

console.log(r);
