/*
 * @Description: 
 * @Date: 2021-08-25 00:08:33
 * @LastEditTime: 2021-08-28 12:48:13
 * @LastEditors: linwei
 */

// Gulp 的入口文件，因为是 Node 模块，可以采用 CommonJS 模块化语法


// /**
//  * 注册任务
//  */
// // 4.x 以前的版本
// const gulp = require('gulp');
// gulp.task('bar', done => {
//   console.log('bar任务')
//   done();
// })

// // 4.x 版本
// // 通过在 exports 上定义需要 Gulp 自动执行的任务
// exports.foo = (done) => {  
//   console.log('foo任务')
//   done();  // 标识任务完成
// }
// // or
//   const foo = () => {}
//   module.exports = {
//     foo
//   }

/**
 * 标识任务完成
 */
// 1. done
// exports.doneEnd = (done) => {
//   console.log('doneEnd')
//   done();  // 标识任务完成
// }
// // 2. return promise
// // 返回决议的 promise
// exports.promiseEnd = () => {
//   console.log('promiseEnd')
//   return Promise.resolve();  // 标识任务完成
// }

// // async/await 也返回一个决议的 promise
// const mockPromise = time => {
// 	return new Promise(resolve => {
//     setTimeout(resolve, time);
//   })
// }
// exports.asyncEnd = async () => {
//   console.log('asyncEnd')
// 	await mockPromise(1000);
// }
// // 3. return nodejs stream
// // 因为在构建工具中，最常见的就是处理文件，所以通过流的方式来处理文件是最常见的：
// const fs = require('fs');
// exports.streamEnd = () => {
//   // 流的过程：就是一点点从  读的流 通过管道流到 写的流
//   // 当读的过程结束了，整个过程就相当于结束了
//   const readStream = fs.createReadStream('package.json');
//   const writeStream = fs.createWriteStream('temp.txt');
//   readStream.pipe(writeStream);
//   return readStream;
// }

// // 相当于 ===> 

// exports.streamEndTwo = (done) => {
//   const readStream = fs.createReadStream('package.json');
//   const writeStream = fs.createWriteStream('temp.txt');
//   readStream.pipe(writeStream);
//   readStream.on('end', () => {
//     done();
//   })
// }


// /**
//  *  默认任务
//  */
// exports.default = (done) => {
//   console.log('default 任务')
//   done();
// }

// /**
//  * 组合任务
//  */
// const { series, parallel } = require('gulp');

// const task1 = done => {
//   setTimeout(()=>{
//     console.log('task1 working');
//     done();
//   },1000)
// }

// const task2 = done => {
//   setTimeout(()=>{
//     console.log('task2 working');
//     done();
//   },1000)
// }

// const task3 = done => {
//   // setTimeout(()=>{
//     console.log('task3 working');
//     // done();
//   // },1000)
// }

// exports.seriesTask = series(task1, task2, task3);
// exports.parallelTask = parallel(task1, task2, task3);



/**
 * 构建过程简单原理
 * 输入/读取 -> 处理/转换 -> 输出/写入
 */
//  实现 css 压缩
// 原生 Nodejs 
// const fs = require('fs');
// const { Transform } = require('stream');

// exports.default = () => {
//   // 文件读取流
//   const readStream = fs.createReadStream('css/main.css');
//   // 文件写入流
//   const writeStream = fs.createWriteStream('css/main.min.css');

//   // Transform: 文件转换流，可以在写入和读取数据时修改或转换数据的 Duplex 流
//   const transformStream = new Transform({
//     transform: (chunk, encoding, callback) => {
//       const input = chunk.toString(); // chunk 是一个 buffer
//       const output = input.replace(/\s+/g,'') // 去掉空格
//                           .replace(/\/\*.+?\*\//g,'');  // 去掉注释
//       callback(null, output);
//     }
//   })

//   readStream
//     .pipe(transformStream)
//     .pipe(writeStream)

//   return readStream;
// }

// gulp 提供的API
// const gulp = require('gulp');
// const { src, dest } = gulp;
// const cleanCss = require('gulp-clean-css');

// exports.default = () => {
//   return src('css/gulp.css') // 读入待压缩的css文件
//           .pipe(cleanCss()) // 对css文件进行压缩
//           .pipe(dest('css/gulp.min.css')) // 输出的文件路径（注意这里指的是文件目录）
// }

// 改进，修改文件名称
const gulp = require('gulp');
const { src, dest } = gulp;
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
  return src('css/gulp.css') // 读入待压缩的css文件
          .pipe(cleanCss()) // 对css文件进行压缩
          .pipe(rename({ extname: '.min.css'})) // 修改后缀名
          .pipe(dest('css')) // 输出的文件路径（注意这里指的是文件目录）
}