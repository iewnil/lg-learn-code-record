/*
 * @Description:  自定义 ES Module 模块
 * @Date: 2021-08-17 08:58:11
 * @LastEditTime: 2021-08-17 11:35:15
 * @LastEditors: linwei
 */
// 加载模块
// console.log(require);

// 导出模块
// console.log(exports);

// 模块对象
// console.log(module);

// 当前文件的绝对路径
// console.log(__filename);

// 当前文在所在目录
// console.log(__dirname);


// 这五个全局成员其实是 NodeJS 通过 cjs/loader.js 在外面包了一层函数，传入的参数，是伪全局成员
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('import.meta.url: ',import.meta.url)
console.log('__filename: ',__filename);
console.log('__dirname:', __dirname);