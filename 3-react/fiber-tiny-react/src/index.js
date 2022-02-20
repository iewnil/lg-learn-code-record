/*
 * @Description: 
 * @Date: 2021-12-04 16:12:58
 * @LastEditTime: 2022-02-16 11:30:32
 * @LastEditors: linwei
 */
// console.log('hello fiber tiny react test');
import React, { Component } from './fiber-react';
const jsx = (
  <div>
    <div>
      <div>
        <p>左1</p>
        <p>左2</p>
      </div>
      <div>
        <p>左3</p>
        <p>左4</p>
      </div>
    </div>
    <div>
      <p>右1</p>
      <p>右2</p>
    </div>
  </div>
)
const jsx2 = (
  <div>
    <div>
      <div>
        <p>左1</p>
        <p>左2</p>
      </div>
      <div>
        <p>左3</p>
        <p>左4</p>
      </div>
    </div>
    <div>
      <p>右1</p>
    </div>
  </div>
)

// const jsx2 = (
//   <div>
//     <div>
//       <div>
//         <p>左11</p>
//         <p>左22</p>
//       </div>
//       <div>
//         <p>左33</p>
//         <p>左44</p>
//       </div>
//     </div>
//     <div>
//       <p>右11</p>
//       <p>右22</p>
//     </div>
//   </div>
// )

console.log(jsx);

class ClassComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.title} this is classComp</div>
    )
  }
}

function FuncComp(props) {
  return (
    <div>{props.title} this is funComp</div>
  )
}

class UpdateClassComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'lw'
    }
  }

  render() {
    return (
      <div>
        <button onClick={()=> this.setState({ name: 'wl'})}>更改name</button>
        <div>this is updateClassComp，name：{this.state.name}</div>
      </div>
    )
  }
}

React.render(jsx, document.getElementById('root'))
// React.render(<ClassComp title="hello"/>, document.getElementById('root'))
// React.render(<FuncComp title="hello"/>, document.getElementById('root'))
// setTimeout(()=> {
//   React.render(jsx2, document.getElementById('root'))
// },2000)
// React.render(<UpdateClassComp/>, document.getElementById('root'))