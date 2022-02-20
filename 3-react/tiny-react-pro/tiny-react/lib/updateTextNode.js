/*
 * @Description: 
 * @Date: 2021-11-03 22:02:39
 * @LastEditTime: 2021-11-14 13:28:10
 * @LastEditors: linwei
 */
export default function updateTextNode(virtualDom, oldVirtualDom, oldDom) {
  const newTextContent = virtualDom.props.textContent;
  // 判断文本内容相不相同，若不相同，则要更新文本节点（即oldDom的文本内容，并且用新vdom替换旧vdom）
  if(newTextContent !== oldVirtualDom.props.textContent) {
    oldDom.textContent = newTextContent;
    oldDom._virtualDom = virtualDom;
  }
}