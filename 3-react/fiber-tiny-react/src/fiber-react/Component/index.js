import { scheduleUpdate } from "../reconciliation";

/*
 * @Description: 
 * @Date: 2021-12-06 19:44:26
 * @LastEditTime: 2021-12-07 09:20:34
 * @LastEditors: linwei
 */
export class Component {
  constructor(props) {
    this.props = props;
  }
  setState(partialState) {
    scheduleUpdate(this, partialState);
  }
}