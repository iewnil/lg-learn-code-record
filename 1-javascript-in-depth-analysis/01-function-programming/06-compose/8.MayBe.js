/*
 * @Description: 
 * @Date: 2021-06-09 23:44:40
 * @LastEditTime: 2021-06-10 00:02:58
 * @LastEditors: linwei
 */
class MayBe {
	constructor (value) {
  	this._value = value; // 下划线表示此变量为私有的
  }

  static of (value) {
    return new MayBe(value);
  }
	
  // 如果对空值变形的话，直接返回值为 null 的函子
  map (fn) {
    return this.isNothing ? MayBe.of(null) : MayBe.of(fn(this._value));
  }
  
  isNothing () {
    return this._value === null || this._value === undefined
  }
}

// let r = MayBe.of(undefined)
// 	.map(x => x.toUpperCase())

// console.log(r);

/**
 * 问题
 */
let r = MayBe.of(undefined)
	.map(x => x.toUpperCase())
	.map(x => null)
	.map(x => x.toUpperCase())

console.log(r);