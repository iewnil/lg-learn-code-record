/*
 * @Description: 
 * @Date: 2021-11-08 00:22:37
 * @LastEditTime: 2021-11-15 23:36:58
 * @LastEditors: linwei
 */
export default function unmountElement(ele) {

  // 获取节点对应的 virtualDom
  const eleVirtualDom = ele._virtualDom;

  // 若删除的节点是文本节点的话，直接删除
  if(eleVirtualDom.type === 'text') {
    ele.remove();
    return;
  }

  // 若删除的节点是由组件生成的，则要调用组件的卸载生命周期函数
  if(eleVirtualDom.component) {
    eleVirtualDom.component.componentWillUnmount();
  }

  // 若删除的节点有 ref 属性，则要删除通过 ref 属性传递给组件的 DOM 节点对象
  if(eleVirtualDom.props.ref) {
    eleVirtualDom.props.ref(null);
  }

    // 若删除的节点身上有事件，则需要移除对应的事件处理函数
    Object.keys(eleVirtualDom.props).forEach(prop=> {
      if(prop.slice(0, 2) === 'on') {
        const eventName = prop.toLowerCase().slice(2);
        const eventHandler = virtualDom.props[prop];
        ele.removeEventListener(eventName, eventHandler);
      }
    })

  // // 递归遍历节点的子节点进行删除
  // if(ele.childNodes.length > 0) {
  //   // ele.childNodes.forEach(child => {
  //   //   unmountElement(child);
  //   // })
  //   for(let i = 0; i < ele.childNodes.length; i++) {
  //     unmountElement(ele.childNodes[i]);
  //     i--;
  //   }
  // }

  ele.remove();
}