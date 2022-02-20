/*
 * @Description: 对象属性访问
 * @Date: 2021-08-08 10:52:16
 * @LastEditTime: 2021-08-08 10:54:19
 * @LastEditors: linwei
 */

function Person() {
  this.name = 'Coder';
  this.age = 18;

  this.getAge = function() {
    return this.age;
  }
}

const p1 = new Person();
const a = p1.getAge();

function Person() {
  this.name = 'Coder';
  this.age = 18;
}

const p2 = new Persion();
const b = p2.age;