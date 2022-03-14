import React, { Component } from 'react';

class A extends Component {
  // 组件是否渲染重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    // 返回 true 渲染
    // 返回 false 不渲染
    if(this.props.person.name === nextProps.person.name) {
      return false;
    }

    return true;
  }

  render() {
    console.log('A render')
    return <div>A {this.props.person.name}</div>
  }
}

class B extends Component {
  render() {
    console.log('B render')
    return <div>B {this.props.person.name}</div>
  }
}

class Comp extends Component {
  constructor() {
    super();
    this.state = {
      person: { name: 'coderlw'}
    }
  }

  // 组件是否渲染重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    // 返回 true 渲染
    // 返回 false 不渲染
    if(this.state.person.name === nextState.person.name) {
      return false;
    }

    return true;
  }

  render() {
    console.log('Comp render')
    return (
      <>
        <button onClick={() => { this.setState({ person: { name: 'coderlw'} }) }}>coderlw</button>
        <button onClick={() => { this.setState({ person: { name: '李四'} }) }}>李四</button>
        <A person={this.state.person}/>
        <B person={this.state.person}/>
      </>
    )
  }
}

export default Comp;