/*
 * @Description: 
 * @Date: 2021-06-10 00:24:23
 * @LastEditTime: 2021-06-10 00:32:07
 * @LastEditors: linwei
 */

/**
 * 处理异常
 */
class Left {
	constructor (value) {
  	this._value = value; // 下划线表示此变量为私有的
  }

  static of (value) {
    return new Left(value);
  }

  // 返回自身函子
  map (fn) {
    return this;
  }
}

/**
 * 正常
 */
class Right {
  constructor (value) {
  	this._value = value; // 下划线表示此变量为私有的
  }

  static of (value) {
    return new Right(value);
  }

  map (fn) {
    return Right.of(fn(this._value));
  }
}

function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({ error: e.message });
  }
}

let r = parseJSON('{ "name": "zs" }')
          .map(x => x.name.toUpperCase())
console.log(r);
