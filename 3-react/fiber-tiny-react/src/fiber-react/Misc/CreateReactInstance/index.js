/*
 * @Description: 
 * @Date: 2021-12-06 19:55:55
 * @LastEditTime: 2022-02-15 14:38:17
 * @LastEditors: linwei
 */
export const createReactInstance = fiber => {
  let instance = null;
  if(fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props);
    // console.log('instance',instance)
  } else {
    instance = fiber.type;
  }
  return instance;
}