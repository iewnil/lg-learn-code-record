/*
 * @Description: 
 * @Date: 2021-10-30 18:34:45
 * @LastEditTime: 2021-11-14 18:15:08
 * @LastEditors: linwei
 */
import diff from './diff';

class Component {
  constructor(props) {
    this.props = props;
  }

  updateProps(props) {
    this.props = props;
  }
  
  setState(state) {
    this.state = Object.assign({}, this.state, state);
    const newVirtualDom = this.render();
    const oldDom = this.getDom();
    diff(newVirtualDom, oldDom.parentNode, oldDom);
  }

  setDom(dom) {
    this._dom = dom;
  }

  getDom() {
    return this._dom;
  }
}

export default Component;