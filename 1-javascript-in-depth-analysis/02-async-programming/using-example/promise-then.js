/*
 * @Description: 
 * @Date: 2021-06-30 13:58:10
 * @LastEditTime: 2021-12-18 12:17:01
 * @LastEditors: linwei
 */


/**
 * return 普通值
 */

// // 上一个 .then 成功回调
// const promise = new Promise(function(resolve) {
//   resolve('上一个then成功');
// })
// promise
//   .then(function(value) {
//     console.log('上一个 then 的成功回调：', value);
//     return '普通值'
//   })
//   .then(function (value) {
//     console.log('下一个 then 成功回调：', value);
//   })

// // 上一个 .then 失败回调
// const promise = new Promise(function(_, reject) {
//   reject('上一个then失败');
// })
// promise
//   .then(function() {}, function(value) {
//     console.log('上一个then的失败回调：', value);
//     return '普通值'
//   })
//   .then(function (value) {
//     console.log('下一个 then 成功回调：', value);
//   })


/**
 * return promise 值
 */

// // 上一个 .then 成功回调——返回 promise 成功决议
// const promise = new Promise(function(resolve) {
//   resolve('上一个then成功');
// })
// promise
//   .then(function(value) {
//     console.log('上一个 then 的成功回调：', value);
//     return new Promise(function(resolve) {
//       // 因为这边 promise 是成功决议，所以在会在下一个 then 的成功回调中得到决议值
//       resolve('promise 成功决议')
//     })
//   })
//   .then(function (value) {
//     console.log('下一个 then 成功回调：', value);
//   })

// // 上一个 .then 成功回调——返回 promise 失败决议
// const promise = new Promise(function(resolve) {
//   resolve('上一个then成功');
// })
// promise
//   .then(function(value) {
//     console.log('上一个 then 的成功回调：', value);
//     return new Promise(function(_, reject) {
//       // 因为这边 promise 是失败决议，所以在会在下一个 then 的失败回调中得到决议值
//       reject('promise 失败决议');
//     })
//   })
//   .then(function() {}, function (value) {
//     console.log('下一个 then 失败回调：', value);
//   })


// // 上一个 .then 失败回调——返回 promise 成功决议
// const promise = new Promise(function(_, reject) {
//   reject('上一个then失败');
// })
// promise
//   .then(function() {}, function(value) {
//     console.log('上一个 then 的失败回调：', value);
//     return new Promise(function(resolve) {
//       // 因为这边 promise 是成功决议，所以在会在下一个 then 的成功回调中得到决议值
//       resolve('promise 成功决议')
//     })
//   })
//   .then(function (value) {
//     console.log('下一个 then 成功回调：', value);
//   })

// 上一个 .then 失败回调——返回 promise 失败决议
// const promise = new Promise(function(_, reject) {
//   reject('上一个then失败');
// })
// promise
//   .then(function() {}, function(value) {
//     console.log('上一个 then 的失败回调：', value);
//     return new Promise(function(_, reject) {
//       // 因为这边 promise 是失败决议，所以在会在下一个 then 的失败回调中得到决议值
//       reject('promise 失败决议');
//     })
//   })
//   .then(function() {}, function (value) {
//     console.log('下一个 then 失败回调：', value);
//   })

// // .catch 也能收到失败
// promise
//   .then(function() {}, function(value) {
//     console.log('上一个 then 的失败回调：', value);
//     return new Promise(function(_, reject) {
//       // 因为这边 promise 是失败决议，所以在会在下一个 then 的失败回调中得到决议值
//       reject('promise 失败决议');
//     })
//   })
//   .catch(function(value) {
//     console.log('catch 回调', value)
//   })