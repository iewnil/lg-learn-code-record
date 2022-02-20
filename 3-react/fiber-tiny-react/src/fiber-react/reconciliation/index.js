/*
 * @Description: 
 * @Date: 2021-12-05 10:47:38
 * @LastEditTime: 2022-02-16 11:31:23
 * @LastEditors: linwei
 */
import { createTaskQueue, createStateNode, getTag, arraied, getRoot } from '../Misc';
import { updateNodeEleAttrEvent, updateTextNode } from '../DOM';

const taskQueue = createTaskQueue();
let workInProgress = null;
let pendingCommit = null;

const getFirstFiber = () => {
  const task = taskQueue.pop();

  // 任务来自组件更新
  if(task.from === 'class_component') {
    const rootFiber = getRoot(task.instance);
    task.instance.__fiber.partialState = task.partialState;
    // 返回根节点（root节点）的 fiber 对象
    return {
      props: rootFiber.props,
      stateNode: rootFiber.stateNode,
      tag: 'host_root',
      effects: [],
      child: null,
      alternate: rootFiber // 备份旧 fiber
    }
  }

  // 任务来自初始渲染
  // 返回根节点（root节点）的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__oldFiber // 备份旧 fiber
  }
}

// 循环所有的 fiber 对象数组 effects，将其操作应用到真实 dom 树上，不可中断的
const commitAllFiber = fiber => {
  // 根据 fiber 之间的关系，构建真实的 dom 树
  fiber.effects.forEach(item => {

    // 为类组件的实例对象添加其对应的 fiber
    if(item.tag === 'class_component') {
      item.stateNode.__fiber = item;
    }

    // 删除操作
    if(item.effectTag === 'delete') {
      let parentFiber = item.parent;
      parentFiber.stateNode.removeChild(item.stateNode);
    }

    // 更新操作
    if(item.effectTag === 'update') {
      let parentFiber = item.parent;
      // 判断当前fiber 与 备份旧fiber 类型是否相同
      if(item.type === item.alternate.type) {
        // 相同
        // 判断是否为文本节点，若是则更新文本节点
        if(item.type === 'text') {
          updateTextNode(item, item.alternate, item.stateNode);
        } else {
          // 更新节点属性
          updateNodeEleAttrEvent(item.stateNode, item, item.alternate);
        }
      } else {
        // 不同
        parentFiber.stateNode.replaceChild(item.stateNode, item.alternate.stateNode);
      }
    }
    
    // 新增操作
    if(item.effectTag === 'placement') {
      // 一直往上找到不是组件的父级fiber，才有对应的真实dom节点
      let parentFiber = item.parent;
      while(['class_component', 'function_component'].includes(parentFiber.tag)) {
        parentFiber = parentFiber.parent;
      }
      // 将当前 fiber 对应的真实 dom节点，插入到其父级 fiber 对应的真实dom节点
      if(item.tag === 'host_component') {
        parentFiber.stateNode.append(item.stateNode);
      }
    }
  })
  // root根节点 的真实dom对象上备份其旧的 fiber 节点对象
  fiber.stateNode.__oldFiber = fiber; 
}

/**
 * 递阶段
 * 1. 创建真实 DOM 对象/ 实例
 * 2. 构建当前 fiber 的子级 fiber 
 * @param {*} fiber 
 */
const beginWork = (fiber) => {
  let index = 0;
  let childrenVdoms = []; // fiber 对象对应的 vdom的子 vdoms
  let childVdom = null; // 子 vdom
  let childNewFiber = null;
  let childOldFiber = null; // 子 vdom 对应的备份 fiber

  // 获取子 vdoms 
  if(fiber.tag === 'class_component') {
    if(fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState
      }
    }
    childrenVdoms = fiber.stateNode.render();
  } else if(fiber.tag === 'function_component') {
    childrenVdoms = fiber.stateNode(fiber.props);
  } else {
    childrenVdoms = fiber.props.children;
  }
  childrenVdoms = arraied(childrenVdoms);

  // 获取当前 fiber 对象 对应的旧fiber，设置子 vdoms 循环中 备份的初始值 为 旧fiber的第一个 child 
  if(fiber.alternate && fiber.alternate.child) {
    childOldFiber = fiber.alternate.child;
  }

  let prevFiber = null; // 上一个兄弟 fiber 对象
  // 遍历子 vdoms，构建子 fiber （这里要多判断一下有没有 childOldFiber，因为可能存在新的 vdoms 没有了，但是旧的有，所以要删除）
  while(index < childrenVdoms.length || childOldFiber) {
    childVdom = childrenVdoms[index];

    // 标记删除 fiber
    if(!childVdom && childOldFiber) {
      childOldFiber.effectTag = 'delete';
      fiber.effects.push(childOldFiber); // 有点疑惑？
    } else if(childVdom && !childOldFiber) {
      // 标记新增 fiber
      childNewFiber = {
        type: childVdom.type,
        props: childVdom.props,
        tag: getTag(childVdom),
        effects: [],
        effectTag: 'placement',
        stateNode: null,
        parent: fiber,
      }
      // 创建新 dom/实例
      childNewFiber.stateNode = createStateNode(childNewFiber);
    } else if(childVdom && childOldFiber) {
      // 标记更新 fiber
      childNewFiber = {
        type: childVdom.type,
        props: childVdom.props,
        tag: getTag(childVdom),
        effects: [],
        effectTag: 'update',
        stateNode: null,
        parent: fiber,
        alternate: childOldFiber,
      }
      // 判断类型
      if(childVdom.type === childOldFiber.type) {
        // 相同，用原来的旧 dom/实例
        childNewFiber.stateNode = childOldFiber.stateNode;
      } else {
        // 不同，创建新 dom/实例
        childNewFiber.stateNode = createStateNode(childNewFiber);
      }
    } 

    // 将第一个子节点的 fiber 对象作为 child
    if(index === 0) {
      fiber.child = childNewFiber;
    } else if(childVdom) {
      prevFiber.sibling = childNewFiber; 
    }

    // 下一个兄弟旧 fiber，相当于 index++了
    if(childOldFiber && childOldFiber.sibling) {
      childOldFiber = childOldFiber.sibling;
    } else {
      // 要记得设为 null，否则会死循环
      childOldFiber = null;
    }

    prevFiber = childNewFiber;

    index++;
  }
}


/**
 * 归阶段（即构建右侧 fiber 树）
 * 1. 构建同级 fiber
 *    如果存在同级，返回同级，构建同级的子级 fiber
 *    如果不存在同级，回退到父级，继续构建父级的同级
 * 2. 构建 effects 数组（过程中会收集 fiber 对象于 effects 数组中），源码中是构建 effect 链表
 * 3. 源码中创建 DOM 也是在这里完成的，只不过这边是在 beginWork 里做的
 * @param {*} fiber 
 */
const completeUnitOfWork = (workInProgressFiber) => {
  // 如果有父级，开启归过程
  while(workInProgressFiber.parent) {
    const returnFiber = workInProgressFiber.parent;
    // 收集fiber对象：将当前 fiber 对象存入父级的 fiber收集数组，依次回退，会一直收集到根节点
    returnFiber.effects = returnFiber .effects.concat(
      workInProgressFiber.effects.concat([workInProgressFiber])
    )

    // 补充源码中构建 effect 链表的主要逻辑
    buildLikedList(workInProgressFiber, returnFiber)

    // 如果有同级
    if(workInProgressFiber.sibling) {
      // 返回同级节点，构建同级的子级 fiber
      return workInProgressFiber.sibling
    }
    // 不存在同级节点，则回退到父级，继续构建父级的同级
    workInProgressFiber = returnFiber;
  }
  // 最终会回退到最外层节点
  pendingCommit = workInProgressFiber;
}

/** 模拟递归
 * 构建每个 fiber 节点，其实就是在构建 fiber 树（模拟递归的方式），主要工作：
 *  - 从上到下，模拟递阶段构建：beginWork
 *  - 从下到上（回退），模拟归阶段构建：complateUnitOfWork 
 * @param {Object} fiber 
 * @returns 
 */
const performUnitOfWork = (fiber) => {
  beginWork(fiber);

  // 构建左侧 fiber 树
  if(fiber.child) {
    return fiber.child;
  }

  return completeUnitOfWork(fiber);
}

// 构建 fiber 阶段：基于任务对象中存储的 vdom 树，构建 fiber 对象树（链表结构），可中断的
const workLoop = (deadline) => {
  if(!workInProgress) {
    workInProgress = getFirstFiber();
  }

  // 构建 fiber 对象的子 fiber 对象
  // 构建的过程中 -> 真实 dom
  while(workInProgress && deadline.timeRemaining() > 1) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}


/**
 * 执行任务：
 * 任务怎么来？有几种不同类型
 * 1、首次挂载时
 * 2、组件更新时
 * 是什么？
 * 1、首次挂载，则为根节点的描述对象，含有根节点的 dom，与 props（含有子 vdoms）
 * 2、组件更新时，from 来自类组件，instance 组件实例，partialState 新的 state
 * 怎么执行？通过 requestIdelCallback 执行
 * 执行的内容，分为两个阶段：
 * ① 构建 fiber 阶段：基于任务对象中存储的 vdom 树，构建 fiber 对象树（链表结构），可中断的
 * ② commit阶段：循环所有的 fiber 对象数组 effects，将其操作应用到真实 dom 树上，不可中断的
 * 任务队列：数组
 */
const performTask = (deadline) => {
  // 1. 构建 fiber 阶段
  workLoop(deadline);

  console.log('pendingCommit',pendingCommit)
  // 2. commit阶段
  if(pendingCommit) {
    commitAllFiber(pendingCommit);
  }

  // 尝试重启构建 fiber 对象
  if(workInProgress || taskQueue.hasTask()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, containerDom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */
  taskQueue.push({
    dom: containerDom,
    props: { children: element }
  })

  requestIdleCallback(performTask);
}

export const scheduleUpdate = (instance, partialState) => {
  taskQueue.push({
    from: 'class_component',
    instance,
    partialState,
  })

  requestIdleCallback(performTask);
}


/**
 * 补充源码中构建 effect 链表的主要逻辑
 * @param {*} workInProgressFiber 
 * @param {*} returnFiber 
 */
const buildLikedList = (workInProgressFiber, returnFiber) => {
  // 源码再现：如果存在需要执行 DOM 操作，构建 effect 链表
  if(workInProgressFiber.effectTag) {
    // 将需要进行 DOM 操作的 fiber 通过链表串联起来
    // 链尾理解步骤：tail1 tail2 345 ...
    // 链头理解步骤：head1 head2 345 ...

    // head2：将链头一步步往回传，最终传到 rootFiber.firstEffect
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workInProgressFiber.firstEffect;
    }

    // 刚开始构建链表（处于第一个fiber，即链头）时，workInProgressFiber.lastEffect 不存在
    if (workInProgressFiber.lastEffect) {

      // tail5：如果父级链尾已经存在（即，需要将当前构建的链表与前面构建的链表进行连接）
      if (returnFiber.lastEffect) {
        // 那么将当前fiber构建的链表的头，接入到父级链尾后面，然后在后面更新父级链尾为当前 fiber构建的链表尾
        returnFiber.lastEffect.nextEffect = workInProgressFiber.firstEffect;
      }

      // tail4：更新链尾
      // 有两种情况：1.发生在层级上移时，需要将链尾值往上传 2. 接入兄弟节点那边构建的链表后，需要更新链尾值为兄弟链表的链尾
      returnFiber.lastEffect = workInProgressFiber.lastEffect;
    }

    // // tail4：如果链尾不存在
    // if(!returnFiber.lastEffect) {
    //   // 第一次时，fiber.lastEffect 为空，所以真正有值其实是发生在 tail1
    //   // 非第一次时，说明此时归过程层级往上退了一层，则此时链尾应该设置为下层级的链尾值（将链尾值向上传）
    //   returnFiber.lastEffect = workInProgressFiber.lastEffect;
    // }

    // tail2：如果链尾已存在
    if(returnFiber.lastEffect) {
      // tail3：通过nextEffect，串联同级 fiber
      returnFiber.lastEffect.nextEffect = workInProgressFiber;
    } else {
      // head1：第一次链尾不存在，则说明 fiber 是链头，标记链头
      returnFiber.firstEffect = workInProgressFiber;
    }

    // tail1：标记链尾，发生在“串联同级”之间的 fiber 时（每次都在移动更新）
    returnFiber.lastEffect = workInProgressFiber;
  }
}