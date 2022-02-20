/*
 * @Description: 
 * @Date: 2021-08-16 00:29:17
 * @LastEditTime: 2021-08-16 00:29:18
 * @LastEditors: linwei
 */
// 定义/载入一个模块

define(function (require, exports, module) {
  // 通过 require 载入模块依赖
  var $ = require('jquery');
  
  // 通过 exports 或者 module.exports 对外暴露成员
  module.exports  = function () {
    console.log('module A');
    $('body').animate({ margin: '200px'})
  }
})