/*
 * @Description: 
 * @Date: 2021-09-25 11:19:24
 * @LastEditTime: 2021-09-25 11:21:33
 * @LastEditors: linwei
 */

// 为 Number 原型添加自定义方法
Number.prototype.pad = function(size) {
  // 将数字转为字符串
  let result = this + '';
  // 按照指定大小，在前面拼接 0 占位
  while(result.length < size) {
    result = '0' + result;
  }
  return result;
};