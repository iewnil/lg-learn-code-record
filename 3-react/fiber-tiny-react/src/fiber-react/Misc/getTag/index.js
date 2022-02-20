import { Component } from "../../Component";

/*
 * @Description: 
 * @Date: 2021-12-06 09:10:18
 * @LastEditTime: 2022-02-15 14:38:20
 * @LastEditors: linwei
 */
const getTag = vdom => {
  // console.log('vdom', vdom)
  const type = vdom.type;
  if(typeof type === 'string') {
    return 'host_component';
  }

  // if(type.prototype && type.prototype.render) {
  if(Object.getPrototypeOf(type) === Component) {
    return 'class_component';
  }

  return 'function_component';
}

export default getTag;