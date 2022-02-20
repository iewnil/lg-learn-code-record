/*
 * @Description: 
 * @Date: 2021-08-15 17:32:49
 * @LastEditTime: 2021-08-15 17:34:12
 * @LastEditors: linwei
 */

var moduleB = {
  name: 'module-b',

  method1: function() {
    console.log(this.name + 'method1');
  },

  method2: function() {
    console.log(this.name + 'method2');
  }
}