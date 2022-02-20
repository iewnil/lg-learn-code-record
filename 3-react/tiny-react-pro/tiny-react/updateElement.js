/*
 * @Description: 更新节点
 * @Date: 2021-11-13 18:53:26
 * @LastEditTime: 2021-11-14 13:34:16
 * @LastEditors: linwei
 */

import updateNativeElement from "./updateNativeElement";
import isComponent from "./lib/isComponent";
import updateComponentElement from "./updateComponentElement";

export default function updateElement(virtualDom, container, oldDom) {
  // 判断是否需要更新 dom
  // 判断标准，比对新vdom和旧vdom，旧 vdom 怎么来？可以将其挂在 oldDom 上，oldDom怎么来的？是在 createDOMElement里挂上的
  const oldVirtualDom = oldDom._virtualDom;
  // 先判断vdom类型，是否为组件，否则为原生元素
  if(isComponent(virtualDom)) {
    // 处理组件
    updateComponentElement(virtualDom, oldVirtualDom, container, oldDom)
  } else {
    updateNativeElement(virtualDom, oldVirtualDom, oldDom);
  }
}