/*
 * @Description: 
 * @Date: 2021-06-08 23:44:06
 * @LastEditTime: 2021-06-09 00:05:13
 * @LastEditors: linwei
 */
const fp = require('lodash/fp');
const _ = require('lodash');

const composeFn = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '));

console.log(composeFn('NEVER SAY DIE'));


/**
 * lodash.map 与 fp.map 的区别
 */

console.log(_.map(['23', '8', '10'], parseInt));
console.log(fp.map(parseInt,['23', '8', '10']));