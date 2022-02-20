/*
 * @Description: 错误捕获处理
 * @Date: 2021-07-14 23:42:02
 * @LastEditTime: 2021-07-15 23:32:23
 * @LastEditors: linwei
 */
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  // 接收一个执行器函数，函数在 new 实例化过程中（构造函数执行时）立即执行
  constructor(executor) {
    try {
      // 执行器函数接收两个函数参数 resolve, reject
      executor(this.resolve, this.reject);
    } catch(e) {
      this.reject(e);
    }
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

        // 异步调用后，在 resolveNextValue，就能获取到 新的promise（nextPromise）了
        setTimeout(()=> {

          try {
            let nextValue = onFulfilled(this.value);
            resolveNextValue(nextPromise, nextValue, resolve, reject);
          } catch (e) {
            reject(e);
          }

        }, 0)

      } else if(this.status === REJECTED){

        setTimeout(()=> {

          try {
            let nextReason = onRejected(this.reason);
            resolveNextValue(nextPromise, nextReason, resolve, reject);
          } catch (e) {
            reject(e);
          }

        }, 0)

      } else {
        // 处理 pending 状态
        // 将成功回调和失败回调暂存起来
        this.fulfilledCallback.push(() => {

          setTimeout(()=> {
            
            try {
              let nextValue = onFulfilled(this.value);
              resolveNextValue(nextPromise, nextValue, resolve, reject);
            } catch (e) {
              reject(e);
            }

          }, 0)

        });
        this.rejectedCallback.push(() => {

          setTimeout(()=> {

            try {
              let nextReason = onRejected(this.reason);
              resolveNextValue(nextPromise, nextReason, resolve, reject);
            } catch (e) {
              reject(e);
            }
            
          }, 0)
          
        });
      }
    });
    return nextPromise;
  }

}

/**
 * 根据 nextValue 不同值类型，执行不同操作
 * @param {*} nextPromise 下一个（新的） promise
 * @param {*} nextValue 上一个 then 决议回调函数 return 的值
 * @param {*} resolve 新的promise的成功决议函数
 * @param {*} reject 新的promise的失败决议函数
 */
function resolveNextValue (nextPromise, nextValue, resolve, reject) {

  // 判断当前 return 的 promise 是否等于 下一个（新的） promise
  if(nextPromise === nextValue) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }

  // 如果 nextValue 是普通值，则直接 resolve
  // 如果是 promise 对象，则等待决议后，再决定调用 resolve 还是 reject
  if(nextValue instanceof MyPromise) {
    nextValue.then(resolve, reject);
  } else {
    resolve(nextValue);
  }
};

module.exports = MyPromise;