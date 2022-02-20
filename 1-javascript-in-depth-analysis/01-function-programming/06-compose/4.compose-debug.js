/*
 * @Description: 
 * @Date: 2021-06-06 23:17:14
 * @LastEditTime: 2021-06-06 23:51:26
 * @LastEditors: linwei
 */
const _ = require('lodash');

// .split()
const split = _.curry((seperator, str) => _.split(str, seperator));

// .map()
const map = _.curry((fn, arr) => _.map(arr, fn));

// .join()
const join = _.curry((seperator, arr) => _.join(arr, seperator))

// log
const log = v => {
  console.log(v);
  return v;
}

// trace
const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v;
})


// const composeFn = _.flowRight(join('-'), log, map(_.toLower), log, split(' '));
const composeFn = _.flowRight(join('-'), trace('map之后'), map(_.toLower), trace('split之后'), split(' '));

console.log(composeFn('NEVER SAY DIE'));