/*
 * @Description: 
 * @Date: 2021-12-07 20:54:14
 * @LastEditTime: 2021-12-07 21:00:59
 * @LastEditors: linwei
 */
const getRoot = instance => {
  let fiber = instance.__fiber;
  while(fiber.parent) {
    fiber = fiber.parent;
  }

  return fiber;
}

export default getRoot;