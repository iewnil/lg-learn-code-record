/*
 * @Description: 创建真实的dom对象
 * @Date: 2021-10-30 19:06:30
 * @LastEditTime: 2021-11-13 19:43:45
 * @LastEditors: linwei
 */
import updateNodeEleAttrEvent from "./updateNodeEleAttrEvent";
import mountElement from '../mountElement';

export default function createDOMElement(virtualDom) {
  let ele = null;
  // 判断是否为文本节点，否则为元素节点
  if(virtualDom.type === 'text') {
    // 创建文本节点
    ele = document.createTextNode(virtualDom.props.textContent);
  } else {
    // 创建元素节点
    ele = document.createElement(virtualDom.type);
    // 为元素节点设置属性和事件
    updateNodeEleAttrEvent(ele, virtualDom);
  }

  // 将真实dom对应的vdom记下来
  ele._virtualDom = virtualDom;

  // 递归创建子元素
  virtualDom.children.forEach(child => {
    mountElement(child, ele);
  })

  return ele;
}