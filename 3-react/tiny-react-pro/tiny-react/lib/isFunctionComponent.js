/*
 * @Description:  判断是否为函数组件
 * @Date: 2021-10-29 22:03:27
 * @LastEditTime: 2021-10-30 18:58:50
 * @LastEditors: linwei
 */
export default function isFunctionComponent(virtualDom) {
  const type = virtualDom.type;
  return type && !(type.prototype && type.prototype.render) ;
}