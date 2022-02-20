/*
 * @Description: 
 * @Date: 2021-06-09 00:39:11
 * @LastEditTime: 2021-06-09 00:44:19
 * @LastEditors: linwei
 */

// /**
//  * 非 point free
//  */
// function f (word) {
// 	return word.toLowerCase().replace(/\s+/g,'_');
// }


// /**
//  * point free
//  */
// const fp = require('lodash/fp');

// const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);

// console.log('Hello World');


/**
 * 将字符串首字母提取并转为大写，使用 .  分隔
 */
const fp = require('lodash/fp');

const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '));

console.log(firstLetterToUpper('world wild web'));