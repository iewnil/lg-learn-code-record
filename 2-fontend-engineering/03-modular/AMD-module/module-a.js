/*
 * @Description: 
 * @Date: 2021-08-16 00:24:36
 * @LastEditTime: 2021-08-16 00:25:20
 * @LastEditors: linwei
 */
define('moduleA', ['jquery', './module-b'], function($, moduleB) {
	return {
    start: function () {
      $('body').animate({ margin: '200px'})
      moduleB();
    }
  }
})