/*
 * @Description: 
 * @Date: 2021-08-17 00:46:00
 * @LastEditTime: 2021-08-17 01:10:27
 * @LastEditors: linwei
 */
import { foo, bar } from './module.mjs';
console.log(foo, bar);

import fs from 'fs'; // 载入原生模块
fs.writeFileSync('./foo.txt', 'node es module test')

import _ from 'lodash'; // 载入第三方模块
console.log(_.camelCase('ES Module'))

import { camelCase } from 'lodash';
console.log(camelCase('ES Module'));

import { writeFileSync } from 'fs'; // 官方内置模块也做了兼容
writeFileSync('./bar.txt', 'node es module test')