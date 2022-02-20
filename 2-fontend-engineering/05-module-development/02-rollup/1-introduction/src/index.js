/*
 * @Description: 
 * @Date: 2021-10-01 18:12:01
 * @LastEditTime: 2021-10-02 00:28:48
 * @LastEditors: linwei
 */
// import { log } from './logger';
// import messages from './messages';
// import json from '../package.json';
// import { camelCase } from 'lodash-es';
// import _ from 'lodash';

// const msg = messages.hi;

// log(msg);
// log(json);
// log(camelCase('hello-world'));
// log(_.upperCase('hello-world'))

import('./logger').then(({ log })=> {
  log('hello word')
})