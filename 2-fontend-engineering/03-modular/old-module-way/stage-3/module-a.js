/*
 * @Description: 
 * @Date: 2021-08-15 17:47:04
 * @LastEditTime: 2021-08-15 17:50:38
 * @LastEditors: linwei
 */

(function() {
  var name = 'module-a';

  function method1() {
    console.log(name + '#method1');
  }

  function method2() {
    console.log(name + '#method2');
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})();