import React, { Component, PureComponent } from 'react';

class A extends Component {
  render() {
    console.log('A render')
    // return <div>A {this.props.name}</div>
    return <div>A {this.props.person.name}</div>
  }
}

class B extends PureComponent {
  render() {
    console.log('B render')
    // return <div>B {this.props.name}</div>
    return <div>B {this.props.person.name}</div>
  }
}

class Comp extends Component {
  constructor() {
    super();
    // this.state = {
    //   name: 'coderlw'
    // }
    this.state = {
      person: { name: 'coderlw' }
    }
  }


  render() {
    console.log('Comp render')
    return (
      <>
        {/* <button onClick={() => { this.setState({ name: 'coderlw' }) }}>coderlw</button>
        <button onClick={() => { this.setState({ name: '李四' }) }}>李四</button>
        <A name={this.state.name}/>
        <B name={this.state.name}/> */}

        <button onClick={() => { this.setState({ person: { name: 'coderlw' }}) }}>coderlw</button>
        <button onClick={() => { this.setState({ person: { name: '李四' }}) }}>李四</button>
        <A person={this.state.person}/>
        <B person={this.state.person}/>
      </>
    )
  }
}

export default Comp;