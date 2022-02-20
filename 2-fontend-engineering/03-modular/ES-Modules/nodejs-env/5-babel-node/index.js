/*
 * @Description: 
 * @Date: 2021-08-17 00:46:00
 * @LastEditTime: 2021-08-17 11:51:38
 * @LastEditors: linwei
 */
import { foo, bar } from './module.js';
console.log(foo, bar);

import fs from 'fs'; // 载入原生模块
fs.writeFileSync('./foo.txt', 'node es module test')

import { writeFileSync } from 'fs'; // 官方内置模块也做了兼容
writeFileSync('./bar.txt', 'node es module test')