/*
 * @Description: 
 * @Date: 2021-06-06 18:41:55
 * @LastEditTime: 2021-06-06 18:43:28
 * @LastEditors: linwei
 */
const _ = require('lodash');

const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase();

const f = _.flowRight(toUpper, first, reverse);
console.log(f(['one', 'two', 'three']));