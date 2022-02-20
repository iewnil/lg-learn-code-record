/*
 * @Description: 
 * @Date: 2021-10-30 19:13:14
 * @LastEditTime: 2021-11-13 19:51:13
 * @LastEditors: linwei
 */

/**
 * 为元素节点更新属性和事件
 * @param {*} ele 最新的元素dom对象
 * @param {*} virtualDom 新的虚拟dom
 * @param {*} oldVirtualDom 旧的虚拟dom，在首次创建元素设置属性时不存在，所以需要初始化为 {}
 */
export default function updateNodeEleAttrEvent(ele, virtualDom, oldVirtualDom = {}) {
  const newProps = virtualDom.props || {};
  const oldProps = oldVirtualDom.props || {};

  // 为元素设置/更新属性和事件
  Object.entries(newProps).forEach(([key,value]) => {
    const oldPropsValue = oldProps[key];
    // 判断属性和事件名称值相不相同，若不相同/不存在，则进行设置及更新
    if(key !== 'children' && value !== oldPropsValue){
      if(key.slice(0,2) === 'on') {
        // 事件名称
        const eventName = key.toLocaleLowerCase().slice(2);
        // 为元素节点添加事件
        ele.addEventListener(eventName, value);

        // 若存在旧的事件，则移除
        if(oldPropsValue) {
          ele.removeEventListener(eventName, oldPropsValue);
        }

      } else if(key === 'className'){
        // 为元素节点设置class属性
        ele.setAttribute('class', value)
      } else if(['value', 'checked'].includes(key)) {
        ele[key] = value;
      } else {
        // 为元素节点设置属性
        ele.setAttribute(key, value)
      }
    }
  })

  // 判断props是不是少了，则删除属性
  Object.entries(oldProps).forEach(([key,value]) => {
    const newPropsValue = newProps[key];
    if(key !== 'children' && !newPropsValue) {
      if(key.slice(0,2) === 'on') {
        // 事件名称
        const eventName = key.toLocaleLowerCase().slice(2);
        ele.removeEventListener(eventName, value);
      } else if(key === 'className'){
        ele.removeAttribute('class')
      } else if(['value', 'checked'].includes(key)) {
        delete ele.key;
      } else {
        ele.removeAttribute(key)
      }
    }
  })
}
