/*
 * @Description: promise 核心逻辑
 * @Date: 2021-07-05 22:02:57
 * @LastEditTime: 2021-07-07 00:02:40
 * @LastEditors: linwei
 */
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  // 接收一个执行器函数，函数在 new 实例化过程中（构造函数执行时）立即执行
  constructor(executor) {
    // 执行器函数接收两个函数参数 resolve, reject
    executor(this.resolve, this.reject);
  }

  // promise 状态
  status = PENDING;
  // 值
  value = undefined;
  // 原因
  reason = undefined;

  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行（状态只能从pending出发，决议后无法更改）
    if(this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
  }

  reject = (reason) => {
    // 如果状态不是等待，阻止程序向下执行（状态只能从pending出发，决议后无法更改）
    if(this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
  }

  // 定义在原型上，为什么？
  then(onFulfilled, onRejected) {
    if(this.status === FULFILLED){
      onFulfilled(this.value);
    } else if(this.status === REJECTED){
      onRejected(this.reason);
    }
  }
}

module.exports = MyPromise;