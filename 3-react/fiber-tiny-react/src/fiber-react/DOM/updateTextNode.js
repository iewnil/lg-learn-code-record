/*
 * @Description: 
 * @Date: 2021-11-03 22:02:39
 * @LastEditTime: 2021-12-06 22:26:21
 * @LastEditors: linwei
 */
export default function updateTextNode(virtualDom, oldVirtualDom, oldDom) {
  const newTextContent = virtualDom.props.textContent;
  // 判断文本内容相不相同，若不相同，则要更新文本节点（即oldDom的文本内容）
  if(newTextContent !== oldVirtualDom.props.textContent) {
    // 判断文本节点的父节点类型是否相同
    if(virtualDom.parent.type !== oldVirtualDom.parent.type) {
      // 不相同的话，需要将文本节点追加到里面（因为不相同在构建 fiber 的时候，会创建新的dom节点）
      virtualDom.parent.stateNode.append(document.createTextNode(newTextContent))
    } else {
      oldDom.textContent = newTextContent;
    }
  }
}