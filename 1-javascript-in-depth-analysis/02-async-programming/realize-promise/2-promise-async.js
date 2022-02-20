/*
 * @Description: 异步逻辑
 * @Date: 2021-07-06 23:48:05
 * @LastEditTime: 2021-07-09 23:51:58
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

  // 成功回调
  // fulfilledCallback = undefined;
  fulfilledCallback = [];
  // 失败回调
  // rejectedCallback = undefined;
  rejectedCallback = [];

  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行（状态只能从pending出发，决议后无法更改）
    if(this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 决议成功后，调用暂存的成功回调（如果存在）
    // this.fulfilledCallback && this.fulfilledCallback(this.value);
    // 决议成功后，依次调用所有暂存的成功回调（直到为空）
    while(this.fulfilledCallback.length) {
      // this.fulfilledCallback.shift()(this.value);
      // 改进，执行函数，在函数内部会调用成功回调，并传入 this.value
      this.fulfilledCallback.shift()();
    }
  }

  reject = (reason) => {
    // 如果状态不是等待，阻止程序向下执行（状态只能从pending出发，决议后无法更改）
    if(this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 决议失败后，调用暂存的失败回调（如果存在）
    // this.rejectedCallback && this.rejectedCallback(this.reason);
    // 决议成功后，依次调用所有暂存的成功回调（直到为空）
    while(this.rejectedCallback.length) {
      // this.rejectedCallback.shift()(this.reason);
      // 改进，执行函数，在函数内部会调用失败回调，并传入 this.reason
      this.rejectedCallback.shift()();
    }
  }

  // 定义在原型上，为什么？
  then(onFulfilled, onRejected) {
    if(this.status === FULFILLED){
      onFulfilled(this.value);
    } else if(this.status === REJECTED){
      onRejected(this.reason);
    } else {
      // 处理 pending 状态
      // 将成功回调和失败回调暂存起来
      // this.fulfilledCallback = onFulfilled;
      // this.rejectedCallback = onRejected;
      // this.fulfilledCallback.push(onFulfilled);
      // this.rejectedCallback.push(onRejected);

      // 改进：将成功和失败回调通过函数包裹后暂存起来，之后执行函数栈时，会在函数内部进行调用
      // 等回调执行时（也就是执行 resolve 时），this.value 就有值了
      this.fulfilledCallback.push(() => onFulfilled(this.value));
      this.rejectedCallback.push(() => onRejected(this.reason));
    }
  }
}

module.exports = MyPromise;