

/*
 * @Description: 
 * @Date: 2021-11-08 19:45:39
 * @LastEditTime: 2021-11-14 13:34:57
 * @LastEditors: linwei
 */

import diff from "./diff";
import isFunctionComponent from "./lib/isFunctionComponent";
import mountComponentElement from './mountComponentElement';

export default function updateComponentElement(virtualDom, oldVirtualDom, container, oldDom) {
  // 判断是否为同一个组件，首先要获取到新旧组件
  // 新组件构造函数：通过 virtualDom.type 能获取到新组件代表的函数/类
  // 旧组件构造函数：我们可以在挂载组件生成其virtualDom的过程中，将旧组件对应的 实例对象 挂在其virtualDom上（在mountComponentElement中处理）
  // 如何判断？ virtualDom.type === oldVirtualDom._component.constructor

  const oldComponent = oldVirtualDom._component;
  // 一种是判断类组件的实例对象构造函数，一种是直接判断函数组件
  if(virtualDom.type === oldComponent.constructor || virtualDom.type === oldComponent) {
    // 更新组件：
    const newProps = virtualDom.props;
    let newVirtualDom;
    // 判断组件类型，是否为函数组件
    if(isFunctionComponent(virtualDom)) {
      // 通过旧组件生成新的 vdom
      newVirtualDom = oldComponent(newProps);
    } else {
      // 若为类组件：
      // 1、更新旧组件的 props
      oldComponent.updateProps(newProps);
      // 2、通过旧组件生成新的 vdom
      newVirtualDom = oldComponent.render();
    }
    // 3、更新新的 vdom 的 _component
    newVirtualDom._component = oldComponent;
    // 4、对新的 vdom进行 diff
    diff(newVirtualDom, container, oldDom)
  } else {
    // 组件不相同，则创建新组件，移除旧DOM
    mountComponentElement(virtualDom, container, oldDom)
  }
}