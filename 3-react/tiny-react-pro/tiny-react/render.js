/*
 * @Description: 渲染虚拟dom -> 真实dom（过程中需要进行diff）
 * @Date: 2021-10-29 21:48:29
 * @LastEditTime: 2021-11-14 13:20:47
 * @LastEditors: linwei
 */
import diff from './diff';
/**
 * 将 virtualDom -> 真实dom
 * @param {*} virtualDom 由 createElement + jsx -> 虚拟dom
 * @param {*} container 虚拟dom最终挂载的容器，一般为root根节点
 * @param {*} oldDom 旧dom，调用render时，即为root节点的第一个子节点（有且只有一个）
 */
export default function render(virtualDom, container, oldDom = container.firstChild) {
  diff(virtualDom, container, oldDom);
}