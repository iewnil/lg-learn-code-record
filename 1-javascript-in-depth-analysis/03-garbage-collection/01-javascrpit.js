/*
 * @Description:  可达对象
 * @Date: 2021-07-23 09:31:19
 * @LastEditTime: 2021-07-23 09:50:03
 * @LastEditors: linwei
 */
function fn(obj1, obj2) {
  obj1.next = obj2;
  obj2.prev = obj1;
  return {
    obj1,
    obj2
  }
}

let obj = fn({ name: 'obj1' }, { name: 'obj2'});

console.log(obj);

// 移除部分访问路径
delete obj.obj1;
delete obj.obj2.prev;
console.log(obj);