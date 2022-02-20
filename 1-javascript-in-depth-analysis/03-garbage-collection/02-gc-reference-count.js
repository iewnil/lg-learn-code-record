/*
 * @Description:  引用计数
 * @Date: 2021-07-24 11:33:53
 * @LastEditTime: 2021-07-24 12:00:36
 * @LastEditors: linwei
 */
const user1 = {age: 11}
const user2 = {age: 22}
const user3 = {age: 33}

const nameList = [user1.age, user2.age, user3.age];

function fn1() {
  num1 = 1;
  num2 = 2;
}

function fn2() {
  const num3 = 1;
  const num4 = 2;
}

fn1();
fn2();

// 在执行完这个文件后：
// user1,2,3,所对应的内存空间还挂在 window 上，并且nameList中也有引用，所以引用数不为 0，不会判断为垃圾
// 而在 fn1 执行结束后：由于 num1,2,并没有进行变量声明，所以也会挂在 window 上，引用数不为 0，不会判断为垃圾
// 在 fn2 执行结束后，由于 num3,4, 在函数内部声明的，所以在函数执行完毕后会被移除，引用数为 0，判断为垃圾，将会被回收

