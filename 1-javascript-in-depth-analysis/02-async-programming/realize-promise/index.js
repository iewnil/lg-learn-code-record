/*
 * @Description: 测试自定义 promise
 * @Date: 2021-07-05 22:56:29
 * @LastEditTime: 2021-07-16 22:16:10
 * @LastEditors: linwei
 */
// const MyPromise = require('./1-promise-core');
// const MyPromise = require('./2-promise-async');
// const MyPromise = require('./3-promise-then-chain');
// const MyPromise = require('./4-promise-then-return-current-new-promise');
const MyPromise = require('./8-promise-finally.js');

// const promise = new MyPromise((resolve, reject) => {
// 	// resolve('成功的值');
//   // reject('失败的原因');

// 	// 模拟异步
// 	setTimeout(()=> {
// 		// resolve('成功的值');
// 		reject('失败的原因');
// 	},2000)
// })

// // promise.then(onFulfilled,onRejected);

/**
 * 多次执行 promsie.then
 */
// promise.then((value) => {
// 	console.log('成功的值:', value);
// }, (reason) => {
// 	console.log('失败的原因:', reason);
// })

// promise.then((value) => {
// 	console.log('成功的值2:', value);
// }, (reason) => {
// 	console.log('失败的原因2:', reason);
// })

// promise.then((value) => {
// 	console.log('成功的值3:', value);
// }, (reason) => {
// 	console.log('失败的原因3:', reason);
// })


/**
 * .then 链式调用
 */
// const promise = new MyPromise((resolve, reject) => {
// 	// resolve('成功的值');
//   // reject('失败的原因');
// 	// 模拟异步
// 	setTimeout(()=> {
// 		resolve('成功的值');
// 		// reject('失败的原因');
// 	},2000)
// })

/**
 * 普通值
 */
// promise.then((value) => {
// 	console.log('第一个then的成功的值:', value);
// 	return '第二个then的值的来自于第一then的值'
// }, (reason) => {
// 	console.log('第一个then的失败的原因:', reason);
// 	return '第二个then的值来自于第一个then的原因'
// }).then((value) => {
// 	console.log('第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('第二个then的失败的原因:', reason);
// })

// // 多次调用
// promise.then((value) => {
// 	console.log('----------------------多次调用分割线----------------------')
// 	console.log('2.第一个then的成功的值:', value);
// 	return '2.第二个then的值的来自于第一then的值'
// }, (reason) => {
// 	console.log('2.第一个then的失败的原因:', reason);
// 	return '2.第二个then的值来自于第一个then的原因'
// }).then((value) => {
// 	console.log('2.第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('2.第二个then的失败的原因:', reason);
// })


/**
 * promise 值
 */
// const promise = new MyPromise((resolve, reject) => {
// 	// resolve('成功的值');
// 	// reject('失败的原因');
// 	// 模拟异步
// 	setTimeout(()=> {
// 		// resolve('成功的值');
// 		reject('失败的原因');
// 	},2000)
// })

// 来自上一个 then 成功回调 return
// promise.then((value) => {
// 	console.log('第一个then的成功的值:', value);
// 	const promise2 = new MyPromise((resolve , reject) => {
// 		resolve('第二个then的值来自于promise2')
// 		// reject('第二个then的原因来自于promise2')
// 	})
// 	return promise2;
// }).then((value) => {
// 	console.log('第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('第二个then的失败的原因:', reason);
// })

// // 多次调用
// promise.then((value) => {
// 	console.log('----------------------多次调用分割线----------------------')
// 	console.log('2.第一个then的成功的值:', value);
// 	const promise2 = new MyPromise((resolve , reject) => {
// 		resolve('2.第二个then的值来自于promise2')
// 		// reject('2.第二个then的原因来自于promise2')
// 	})
// 	return promise2;
// }).then((value) => {
// 	console.log('2.第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('2.第二个then的失败的原因:', reason);
// })


// // 来自上一个 then 失败回调 return
// promise.then(()=> {} ,(value) => {
// 	console.log('第一个then的成功的值:', value);
// 	const promise2 = new MyPromise((resolve , reject) => {
// 		// resolve('第二个then的值来自于promise2')
// 		reject('第二个then的原因来自于promise2')
// 	})
// 	return promise2;
// }).then((value) => {
// 	console.log('第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('第二个then的失败的原因:', reason);
// })

// // 多次调用
// promise.then(() => {}, (value) => {
// 	console.log('----------------------多次调用分割线----------------------')
// 	console.log('2.第一个then的成功的值:', value);
// 	const promise2 = new MyPromise((resolve , reject) => {
// 		// resolve('2.第二个then的值来自于promise2')
// 		reject('2.第二个then的原因来自于promise2')
// 	})
// 	return promise2;
// }).then((value) => {
// 	console.log('2.第二个then的成功的值:', value);
// }, (reason) => {
// 	console.log('2.第二个then的失败的原因:', reason);
// })


/**
 * promise.then 存在的问题
 * 如果在 promise.then 的决议回调中又 return 了当前的 promise ，需要进行错误处理
 */

// 1. 示例
// const promise = new Promise((resolve)=> {
// 	resolve('成功的值');
// })

// const p2 = promise.then((value)=> {
// 	console.log('成功的值：',value);
// 	return p2;
// })

// p2.then((value)=>{
// 	console.log('来自上一个then成功的值：',value);
// },(reason) => {
// 	console.log('失败的原因：', reason);
// })

// 2. 实现调用
// const promise = new MyPromise((resolve, reject)=> {
// 	resolve('成功的值');
// 	// reject('失败的原因');

// 	// setTimeout(()=> {
// 		// resolve('异步成功的值');
// 		// reject('异步失败的原因');
// 	// },2000)
// })

// // 成功回调返回
// const p2 = promise.then((value)=> {
// 	console.log('成功的值：',value);
// 	return p2;
// })

// p2.then((value)=>{
// 	console.log('来自上一个then成功的值：',value);
// },(reason) => {
// 	console.log('失败的原因：', reason);
// })

// 失败回调返回
// const p2 = promise.then(() => {}, (reason)=> {
// 	console.log('失败的原因：',reason);
// 	return p2;
// })

// p2.then((value)=>{
// 	console.log('来自上一个then成功的值：',value);
// },(reason) => {
// 	console.log('失败的原因：', reason);
// })



/**
 * promise.all
 */

// const p1 = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve('p1');
// 		}, 2000)
// 	})
// }

// const p2 = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve('p2');
// 		}, 2000)
// 	})
// }

// Promise.all(['a','b', p1(), p2(), 'c']).then(result => console.log(result));


/**
 * promise.catch
 */
const promise = new MyPromise((resolve, reject) => {
	reject('失败的原因');
})

promise.catch((reason)=>{
	console.log('reason',reason);
})