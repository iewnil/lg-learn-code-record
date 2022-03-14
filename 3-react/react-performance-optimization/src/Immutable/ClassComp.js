import React, { Component } from 'react';
import { fromJS, setIn, getIn, is } from 'immutable';

class A extends Component {

  // 组件是否渲染重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    // 返回 true 渲染
    // 返回 false 不渲染
    if(is(this.props.person, nextProps.person)) {
      return false;
    }

    return true;
  }

  render() {
    console.log('A')
    // return <div>{getIn(this.props.person, ['name'])}</div>
    return <div>{this.props.person.get('name')}</div>
  }
}


class Comp extends Component {
  constructor() {
    super();
    this.state = {
      person: fromJS({ name: 'coderlw' })
    }
  }

  render() {
    console.log('Comp render');
    return (
      <>
        {/* <button onClick={() => { this.setState({ person: setIn(this.state.person, ["name"], "coderlw") }) }}>coderlw</button>
        <button onClick={() => { this.setState({ person: setIn(this.state.person, ["name"], "李四") }) }}>李四</button>
        <A person={this.state.person}/> */}
        <button onClick={() => { this.setState({ person: this.state.person.set('name', 'coderlw')}) }}>coderlw</button>
        <button onClick={() => { this.setState({ person: this.state.person.set('name', '李四')}) }}>李四</button>
        <A person={this.state.person}/>
      </>
    )
  }
}

export default Comp;

