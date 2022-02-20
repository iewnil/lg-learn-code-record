/*
 * @Description: 挂载元素
 * @Date: 2021-10-29 21:51:46
 * @LastEditTime: 2021-11-13 19:40:35
 * @LastEditors: linwei
 */
import isComponent from './lib/isComponent';
import mountComponentElement from './mountComponentElement';
import mountNativeElement from './mountNativeElement';

export default function mountElement(virtualDom, container, oldDom) {
  
  // 判断vdom类型，是否为组件，否则为原生元素
  if(isComponent(virtualDom)) {
    mountComponentElement(virtualDom, container, oldDom);
  } else {
    mountNativeElement(virtualDom, container, oldDom);
  }
}