function ajax (url) {
	return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
    xhr.send();
  })
}

function * main () {
  const users = yield ajax('./api/user.json');
  console.log(users);

  const posts = yield ajax('./api/user.json');
  console.log(posts);
}

// // 生成生成器
// const g = main();
// // 执行到第一个 yield
// const gValue = g.next();
// 获取第一个 yield 右边的值，是个 promise
// console.log('gValue',gValue);
// gValue.value.then(data => {
//   // 执行到第二个 yield，并将 promise 的值，传给第一个 yield 左边的值
//   const gValue2 = g.next(data);
//   console.log('gValue2',gValue2);

//   // 以此类推，获取第二个 yield右边的值，也是个 promise
//   gValue2.value.then(data => {
//     // 执行到结束，并将 promise 的值，传给第二个 yield 左边的值
//     g.next(data);
//   })
// })


/**
 * 封装——生成器函数执行器
 * @param {*} generator 生成器
 */
function handleGeneratorFun(generator) {
  // 生成生成器
  const g = generator();
  // 执行到第一个 yield
  const gValue = g.next();
  handleGeneratorValue(gValue);
}

/**
 * 
 * @param {*} gValue 当前生成器的值对象
 * @returns 
 */
function handleGeneratorValue(gValue) {
  // 生成器函数执行结束
  if(gValue.done) return;

  // 没有结束，则递归执行
  gValue.value.then(data => {
    handleGeneratorValue(g.next(data))
  }).catch(error => {
    g.throw(error);
  })
}

handleGeneratorFun(main);

