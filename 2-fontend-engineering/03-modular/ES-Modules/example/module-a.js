/*
 * @Description: 
 * @Date: 2021-08-16 00:30:53
 * @LastEditTime: 2021-08-16 01:22:10
 * @LastEditors: linwei
 */
// module-a.js

import { method1 as bMethod1 } from './module-b.js'; // 后缀名是不能省略的

bMethod1();
function method1() {
  console.log('module-a')
}

export {
	method1
}