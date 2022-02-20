/*
 * @Description: promise 静态方法
 * @Date: 2021-06-30 11:09:35
 * @LastEditTime: 2021-12-18 00:06:51
 * @LastEditors: linwei
 */

/**
 *  Promise.resolve(普通值)
 */

// Promise
//   .resolve('普通值')
//   .then(function (value) {
//     console.log('then 成功回调', value);
//   })

// // ===>> 等同于

// new Promise(function(resolve) {
//     resolve('普通值');
//   })
//   .then(function (value) {
//     console.log('then 成功回调', value);
//   })

/**
 * Promise.resolve(promise值)
 */

// // promise 成功决议
// const promise = new Promise(function (resolve) {
//   resolve('promise 成功决议');
// })

// Promise
//   .resolve(promise) // 返回 promise 成功决议
//   .then(function (value) {  // 下一个 .then 成功回调
//     console.log('then 成功回调', value);
//   })

// // ===>> 等同于

// new Promise(function(resolve) {
//     resolve(promise);
//   })
//   .then(function (value) {
//     console.log('then 成功回调', value);
//   })

// // promise 失败决议
// const promise = new Promise(function (_, reject) {
//   reject('promise 失败决议');
// })

// Promise
//   .resolve(promise) // 返回 promise 失败决议
//   .then(function(){}, function (value) {  // 下一个 .then 失败回调
//     console.log('then 失败回调', value);
//   })

// // ===>> 等同于

// new Promise(function(resolve) {
//     resolve(promise);
//   })
//   .then(function(){}, function (value) {
//     console.log('then 失败回调', value);
//   })


/**
 * Promise.reject(普通值)
 */

// // 下一个 .then 失败回调
// Promise
//   .reject('普通值')
//   .then(function() {}, function (value) {
//     console.log('then 失败回调', value);
//   })


// // .catch  
// Promise
//   .reject('普通值')
//   .catch(function (value) {
//     console.log('catch 回调', value);
//   })

// // ===>> 等同于

// new Promise(function(_, reject) {
//     reject('普通值');
//   })
//   .then(function() {}, function (value) {
//     console.log('then 失败回调', value);
//   })

// new Promise(function(_, reject) {
//     reject('普通值');
//   }) 
//   .catch(function (value) {
//     console.log('catch 回调', value);
//   })

/**
 * Promise.reject(promise值)
 */

// promise 成功决议
const promise = new Promise(function (resolve) {
  resolve('promise 成功决议');
})

// 下一个 .then 失败回调
Promise
  .reject(promise)
  .then(function() {}, function (value) {
    console.log('then 失败回调', value);
  })

// .catch 回调
Promise
  .reject(promise)
  .catch(function (value) {
    console.log('catch 回调', value);
  })

// ===>> 等同于

// 下一个 .then 失败回调
new Promise(function(_, reject){
    reject(promise)
  })
  .then(function() {}, function (value) {
    console.log('then 失败回调', value);
  })

// .catch 回调
new Promise(function(_, reject){
    reject(promise)
  })
  .catch(function (value) {
    console.log('catch 回调', value);
  })

// // promise 失败决议
// const promise = new Promise(function (_, reject) {
//   reject('promise 失败决议');
// })

// // 下一个 .then 失败回调
// Promise
//   .reject(promise)
//   .then(function() {}, function (value) {
//     console.log('then 失败回调', value);
//   })

// // .catch 回调
// Promise
//   .reject(promise)
//   .catch(function (value) {
//     console.log('catch 回调', value);
//   })

// // ===>> 等同于

// // 下一个 .then 失败回调
// new Promise(function(_, reject){
//     reject(promise)
//   })
//   .then(function() {}, function (value) {
//     console.log('then 失败回调', value);
//   })

// // .catch 回调
// new Promise(function(_, reject){
//     reject(promise)
//   })
//   .catch(function (value) {
//     console.log('catch 回调', value);
//   })

/**
 * thenable 类 promise 对象
 */
// Promise.resolve({
// 	then: function (onFulfilled, onRejected) {
//     onFulfilled('foo')
//   }
// })
//   .then(function (value) {
//     console.log('then', value);
//   })