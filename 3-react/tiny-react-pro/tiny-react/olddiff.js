/*
 * @Description: 
 * @Date: 2021-10-29 21:50:06
 * @LastEditTime: 2021-11-14 13:27:56
 * @LastEditors: linwei
 */
import mountElement from './mountElement';
import isComponent from './lib/isComponent';
import createDOMElement from './lib/createDOMElement';
import updateTextNode from './lib/updateTextNode';
import updateNodeEleAttrEvent from './lib/updateNodeEleAttrEvent';
// import diffComponent from './diffComponent';
import unmountElement from './lib/unmountElement';

export default function diff(virtualDom, container, oldDom) {
  // 如果没有旧dom，则直接挂载，否则判断是否需要更新dom
  if(!oldDom) {
    mountElement(virtualDom, container);
  } else {
    // 判断是否需要更新 dom
    // 判断标准，比对新vdom和旧vdom，旧 vdom 怎么来？可以将其挂在 oldDom 上，oldDom怎么来的？是在 createDOMElement里挂上的
    const oldVirtualDom = oldDom._virtualDom;
    // 先判断vdom类型，是否为组件，否则为原生元素
    if(isComponent(virtualDom)) {
      // 处理组件
      // diffComponent(virtualDom, oldDom._virtualDom, container, oldDom)
    } else {
      // 处理原生元素，判断元素类型是否相同
      // 若元素类型相同：
      if(virtualDom.type === oldVirtualDom.type) {
        // 判断是否为文本节点，若是则判断是否要更新文本节点
        if(virtualDom.type === 'text'){
          updateTextNode(virtualDom, oldVirtualDom, oldDom);
        } else {
          // 否则判断是否要更新节点属性
          updateNodeEleAttrEvent(oldDom, virtualDom, oldVirtualDom);
        }

        // 遍历子节点，缓存带有key属性的元素节点
        const oldChildNodes = oldDom.childNodes;
        const cacheKeyEleNodes = {};
        for(let i = 0; i < oldChildNodes.length; i++) {
          let eleNode = oldChildNodes[i];
          console.log('elenode', eleNode)
          if(eleNode.nodeType === 1) {
            let key = eleNode.getAttribute('key');
            if(key) {
              cacheKeyEleNodes[key] = eleNode;
            }
          }
        }

        // 判断是否有缓存的子元素节点
        const hasKeyChildCache = Object.keys(cacheKeyEleNodes).length !== 0;

        // 如果没有启用key缓存，则正常进行子节点 diff
        if(!hasKeyChildCache) {
          virtualDom.children.forEach((childVdom, i) => {
            // 遍历子节点，继续递归判断
            diff(childVdom, oldDom, oldChildNodes[i]);
          })
        } else {
          // 通过 key 的方式更新节点，若有相同 key的节点，则直接复用，否则新建
          virtualDom.children.forEach((childVdom, i) => {
            const childKey = childVdom.props.key;
            if(childKey){
              const cacheChild = cacheKeyEleNodes[childKey];
              // 相应的key没有找到缓存的节点，就新建
              if(cacheChild) {
                // 当前位置不是可复用节点，则调换位置
                if(oldChildNodes[i] !== cacheChild) {
                  oldDom.insertBefore(cacheChild, oldChildNodes[i]); // 但无法做到，相同key，但内容不同
                }
              } else {
                // 根据节点vdom新建元素
                mountElement(childVdom, oldDom)
              }
            }
          })
        }

        // 更新完毕后，还要判断子节点是否减少，若减少，则移除旧dom的多余节点（剩余的节点已经更新过了，保持着同步）
        if(virtualDom.children.length < oldChildNodes.length ) {
          // 如果没有启用key缓存，则正常通过索引方式删除节点
          if(!hasKeyChildCache) {
            // 从旧dom的最后一个子节点开始，删除到长度与新vdom子节点数量相同 
            for(let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
              unmountElement(oldChildNodes[i]);
            }
          } else {
            // 判断旧节点的key是否存在于新vdom子节点的key中，没有的话则删除
            for(let i = 0; i > oldChildNodes.length - 1; i++) {
              let oldChildNode = oldChildNodes[i];
              let oldChildNodeKey = oldChildNode._virutalDOM.props.key;
              const found = virtualDom.children.find(child=> child.props.key === oldChildNodeKey);
              if(!found) {
                unmountElement(oldChild);
                i--;
              }
            }
          }
        }

      } else {
        // 若元素类型不同：将新dom替换旧dom，将新vdom替换旧vdom，
        const newDom = createDOMElement(virtualDom);
        oldDom.parentNode.replaceChild(newDom, oldDom);
      }
    }
  }
}