/*
 * @Description: 
 * @Date: 2021-10-29 21:50:06
 * @LastEditTime: 2021-11-14 13:33:56
 * @LastEditors: linwei
 */
import mountElement from './mountElement';
import updateElement from './updateElement';

export default function diff(virtualDom, container, oldDom) {
  // 虚拟dom没有对应的旧dom节点，就创建
  if(!oldDom) {
    mountElement(virtualDom, container);
  } else {
    // 否则进行对应的旧dom节点更新
    updateElement(virtualDom, container, oldDom)
  }
}