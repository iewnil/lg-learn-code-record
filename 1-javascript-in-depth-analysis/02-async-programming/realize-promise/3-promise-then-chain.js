/*
 * @Description: then 的链式调用
 * @Date: 2021-07-07 22:59:39
 * @LastEditTime: 2021-07-14 00:18:15
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
  fulfilledCallback = [];
  // 失败回调
  rejectedCallback = [];

  resolve = (value) => {
    // 如果状态不是等待，阻止程序向下执行（状态只能从pending出发，决议后无法更改）
    if(this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 决议成功后，依次调用所有暂存的成功回调（直到为空）
    while(this.fulfilledCallback.length) {
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
    // 决议成功后，依次调用所有暂存的成功回调（直到为空）
    while(this.rejectedCallback.length) {
      this.rejectedCallback.shift()();
    }
  }

  // 定义在原型上，为什么？
  then(onFulfilled, onRejected) {

    const nextPromise = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED){
        // 下一个 then 决议的值，来自于，上一个（当前） then的 决议回调 return 的值
        let nextValue = onFulfilled(this.value);
        // resolve(nextValue);
        
        // 判断值类型
        resolveNextValue(nextValue, resolve, reject);

      } else if(this.status === REJECTED){

        // 下一个 then 决议的值，来自于，上一个（当前） then的 决议回调 return 的值
        let nextReason = onRejected(this.reason);
        // // 注意：就算是 上一个（当前）then 失败回调 return 的值，也是传给下一个 then 的成功回调
        // resolve(nextReason);

        // 判断值类型
        resolveNextValue(nextReason, resolve, reject);

      } else {
        // 处理 pending 状态
        // 将成功回调和失败回调暂存起来
        this.fulfilledCallback.push(() => {
          // 下一个 then 决议的值，来自于，上一个（当前） then的 决议回调 return 的值
          let nextValue = onFulfilled(this.value);
          // resolve(nextValue);
          resolveNextValue(nextValue, resolve, reject);
        });
        this.rejectedCallback.push(() => {
          let nextReason = onRejected(this.reason);
          // 注意：就算是 上一个（当前）then 失败回调 return 的值，也是传给下一个 then 的成功回调
          // resolve(nextReason);
          resolveNextValue(nextReason, resolve, reject);
        });
      }
    });
    return nextPromise;
  }
}

/**
 * 根据 nextValue 不同值类型，执行不同操作
 * @param {*} nextValue 上一个 then 决议回调函数 return 的值
 * @param {*} resolve 新的promise的成功决议函数
 * @param {*} reject 新的promise的失败决议函数
 */
function resolveNextValue (nextValue, resolve, reject) {
  // 如果 nextValue 是普通值，则直接 resolve
  // 如果是 promise 对象，则等待决议后，再决定调用 resolve 还是 reject
  if(nextValue instanceof MyPromise) {
    // nextValue.then((value) => { resolve(value) }, (reason) => { reject(reason) })
    // 简化
    nextValue.then(resolve, reject);
  } else {
    resolve(nextValue);
  }
};

module.exports = MyPromise;