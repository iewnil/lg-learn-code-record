/*
 * @Description: 模块依赖
 * @Date: 2021-08-15 18:08:55
 * @LastEditTime: 2021-08-15 18:10:25
 * @LastEditors: linwei
 */

(function($) {
  var name = 'module-a';

  function method1() {
    console.log(name + '#method1');
    $('body').animate({ margin: '200px'})
  }

  function method2() {
    console.log(name + '#method2');
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})(jQuery);