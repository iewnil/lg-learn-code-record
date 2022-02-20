/*
 * @Description: 
 * @Date: 2021-12-06 00:06:16
 * @LastEditTime: 2021-12-06 20:32:53
 * @LastEditors: linwei
 */
import { createDOMElement } from "../../DOM";
import { createReactInstance } from '../CreateReactInstance';

const createStateNode = fiber => {
  if(fiber.tag === 'host_component') {
    return createDOMElement(fiber)
  }

  return createReactInstance(fiber);
}

export default createStateNode;