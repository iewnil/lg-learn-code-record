/*
 * @Description: 
 * @Date: 2021-10-29 21:08:11
 * @LastEditTime: 2021-11-14 18:41:43
 * @LastEditors: linwei
 */

/**
 * 将 jsx -> js对象（即 virtualDOM）
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @returns 
 */
export default function createElement(type, props, ...children) {

  // 迭代数组，基于上次的结果，返回最终的结果
  const childElements = [].concat(...children).reduce((preChilds, nextChild)=> {
    // 特殊值不返回
    if(nextChild !== false && nextChild !== true && nextChild !== null) {
      if(typeof nextChild !== 'object') {
        preChilds.push(createElement('text', { textContent: nextChild }))
      } else {
        preChilds.push(nextChild)
      }
    }
    return preChilds;
  }, [])

  return {
    type,
    props: { ...props, children: childElements},
    children: childElements,
  }
}