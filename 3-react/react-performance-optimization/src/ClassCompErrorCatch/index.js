import React, { Component } from 'react';

export default class ClassCompErrorCatch extends Component {
  constructor () {
    super();
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error) {
    console.log('componentDidCatch error', error);
  }

  // 静态方法，用于发生错误时，更改状态
  static getDerivedStateFromError () {
    return {
      hasError: true
    }
  }

  render() {
    if(this.state.hasError) {
      return <div>发生错误啦</div>
    }

    return this.props.children;
  }
}