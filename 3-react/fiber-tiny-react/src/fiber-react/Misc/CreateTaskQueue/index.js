/*
 * @Description: 
 * @Date: 2021-12-05 10:52:32
 * @LastEditTime: 2021-12-05 21:52:26
 * @LastEditors: linwei
 */
const createTaskQueue = () => {
  const taskQueue = [];
  return {
    push: item => taskQueue.push(item),
    pop: () => taskQueue.shift(),
    hasTask: () => !!taskQueue.length
  }
}

export default createTaskQueue;