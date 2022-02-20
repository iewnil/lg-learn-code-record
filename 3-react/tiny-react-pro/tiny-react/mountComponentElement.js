/*
 * @Description: 挂载组件
 * @Date: 2021-10-29 22:01:57
 * @LastEditTime: 2021-11-14 18:17:06
 * @LastEditors: linwei
 */
import isFunctionComponent from './lib/isFunctionComponent';
import mountElement from "./mountElement";

export default function mountComponentElement(virtualDom, container, oldDom) {
  
  // 判断是否为函数组件，否则为class类组件
  if(isFunctionComponent(virtualDom)) {
    const funcVirtualDom = getFuncVirtualDom(virtualDom);
    mountElement(funcVirtualDom, container, oldDom);
  } else {
    const classVirtualDom = getClassVirtualDom(virtualDom)
    mountElement(classVirtualDom, container, oldDom);
  }
}


function getFuncVirtualDom(virtualDom) {
  // return virtualDom.type(virtualDom.props || {}); // 注意默认值 {}
  const funcComp = virtualDom.type;
  const funcVirtualDom = funcComp(virtualDom.props || {}); // 注意默认值 {}
  funcVirtualDom._component = funcComp; // 保存组件实例对象
  return funcVirtualDom;
}

function getClassVirtualDom(virtualDom) {
  const classComp = new virtualDom.type(virtualDom.props || {});
  const classVirtualDom = classComp.render();
  classVirtualDom._component = classComp; // 保存组件实例对象
  return classVirtualDom;
}