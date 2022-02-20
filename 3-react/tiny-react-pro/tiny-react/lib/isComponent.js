/*
 * @Description: 判断是否为组件元素
 * @Date: 2021-10-29 21:55:34
 * @LastEditTime: 2021-10-30 18:58:30
 * @LastEditors: linwei
 */
export default function isComponent(virtualDom) {
  return typeof virtualDom.type === 'function';
}