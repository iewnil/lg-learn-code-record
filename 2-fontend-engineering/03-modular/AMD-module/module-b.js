/*
 * @Description: 
 * @Date: 2021-08-16 00:24:43
 * @LastEditTime: 2021-08-16 00:25:36
 * @LastEditors: linwei
 */
define('moduleB', ['jquery',], function($) {
	return {
    start: function () {
      $('body').animate({ margin: '200px'})
    }
  }
})