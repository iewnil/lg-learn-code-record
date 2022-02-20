/*
 * @Description:  挂载原生元素
 * @Date: 2021-10-29 21:57:00
 * @LastEditTime: 2021-11-14 19:09:28
 * @LastEditors: linwei
 */
import createDOMElement from './lib/createDOMElement';
import unmountElement from './lib/unmountElement';

export default function mountNativeElement(virtualDom, container, oldDom) {

  // 创建虚拟 dom 对应的真实 dom 节点
  let ele = createDOMElement(virtualDom);

  // 如果存在要替换的节点oldDom，则插入到待替换节点的前面，移除待替换节点
  if(oldDom) {
    container.insertBefore(ele, oldDom);
    unmountElement(oldDom);
  } else {
    // 不存在，追加到父节点（容器）的最后面
    container.appendChild(ele);
  }

  // 如果是类组件，则要将 真实dom节点 记录在 类实例下
  let component = virtualDom._component;
  if(component && component.setDom) {
    component.setDom(ele);
  }
}