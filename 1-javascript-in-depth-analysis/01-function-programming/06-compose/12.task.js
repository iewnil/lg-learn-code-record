/*
 * @Description: 
 * @Date: 2021-06-12 19:23:32
 * @LastEditTime: 2021-06-12 19:36:02
 * @LastEditors: linwei
 */
const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const { split, find } = require('lodash/fp');

function readFile (filename) {
  // 返回一个 task 函子
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if(err) resolver.reject(err);

      resolver.resolve(data);
    })
  })
}

readFile('package.json')
  // 类似 IO 函子一样，接收一个函数，返回一个新的函子，新函子的值是一个新的组合函数
  .map(split('\n'))
  .map(find(x => x.includes('folktale')))
  // 由调用者来启动
  .run()
  .listen({
    onRejected: err => {
      console.log(err);
    }, 
    onResolved: value => {
      console.log(value);
    }
  })