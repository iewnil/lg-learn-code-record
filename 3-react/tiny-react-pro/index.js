/*
 * @Description: 
 * @Date: 2021-10-28 23:55:50
 * @LastEditTime: 2021-11-15 23:35:20
 * @LastEditors: linwei
 */
/**
 * 1.测试 createElement
 */
// import TinyReact from './tiny-react';

// const element = (
//   <div>
//     <h1 className="h1-class" data-map="hi">标题</h1>
//     <div>第一个div</div>
//     <div>第二个div</div>
//     <div>
//       <span>第三个div</span>
//     </div>
//     { 1 < 2 && <p>1小于2</p>}
//     { 1 > 2 && <p>1大于2</p>}
//     <input value={1}/>
//     <input type="radio" checked={false}/>
//     <button  onClick={()=> alert('点击按钮啦')}>按钮</button>
//     <div>
//       <p>有三个li</p>
//       <p>ul前的p</p>
//       <ul>  
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//       </ul>
//     </div>
//   </div>
// );

// console.log(element);


/**
 * 2. 测试 render -> diff -> mountElement -> mountNativeElement
 */
// import TinyReact from './tiny-react';

// const element = (
//   <div>
//     <h1 className="h1-class" data-map="hi">标题</h1>
//     <div>第一个div</div>
//     <div>第二个div</div>
//     <div>
//       <span>第三个div</span>
//     </div>
//     { 1 < 2 && <p>1小于2</p>}
//     { 1 > 2 && <p>1大于2</p>}
//     <input value={1}/>
//     <input type="radio" checked={false}/>
//     <button  onClick={()=> alert('点击按钮啦')}>按钮</button>
//     <div>
//       <p>有三个li</p>
//       <p>ul前的p</p>
//       <ul>  
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//       </ul>
//     </div>
//   </div>
// );

// TinyReact.render(element, document.getElementById('root'));

/**
 *  3. 测试 render -> diff -> mountElement -> mountComponentElement
 */
// import TinyReact, { Component } from './tiny-react';

// const FuncComp = (props) => {
//   return (
//     <div>
//       <p>this is func comp</p>
//       <p>this is func comp props title：{props.title}</p>
//       <button  onClick={()=> alert('点击函数组件按钮啦')}>函数组件按钮</button>
//     </div>
//   )
// }

// class ClassComp extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <p>this is class comp</p>
//         <p>this is class comp props title：{this.props.title}</p>
//         <button  onClick={()=> alert('点击类组件按钮啦')}>类组件按钮</button>
//       </div>
//     )
//   }
// }

// const element = (
//   <div>
//     <h1 className="h1-class" data-map="hi">标题</h1>
//     <div>第一个div</div>
//     <div>第二个div</div>
//     <div>
//       <span>第三个div</span>
//     </div>
//     { 1 < 2 && <p>1小于2</p>}
//     { 1 > 2 && <p>1大于2</p>}
//     <input value={1}/>
//     <input type="radio" checked={false}/>
//     <button  onClick={()=> alert('点击按钮啦')}>按钮</button>
//     <div>
//       <p>有三个li</p>
//       <p>ul前的p</p>
//       <ul>  
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//       </ul>
//     </div>
//     <FuncComp title="funcCompTitle"/>
//     <ClassComp title="classCompTitle"/>
//   </div>
// );

// TinyReact.render(element, document.getElementById('root'));


/**
 * 4、测试 render -> diff -> updateElement -> updateNativeElement（不带key版）
 */
// import TinyReact from './tiny-react';

// const element = (
//   <div>
//     <h1 className="h1-class" data-map="hi">标题</h1>
//     <div>第一个div</div>
//     <div>第二个div</div>
//     <div>
//       <span>第三个div</span>
//     </div>
//     { 1 < 2 && <p>1小于2</p>}
//     { 1 > 2 && <p>1大于2</p>}
//     <input value={1}/>
//     <input type="radio" checked={false}/>
//     <button onClick={()=> alert('点击按钮啦')}>按钮</button>
//     <div>
//       <p>有三个li</p>
//       <p>ul前的p</p>
//       <ul>  
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//       </ul>
//     </div>
//   </div>
// );

// const newElement = (
//   <div>
//     <h2 className="new-h1-class" data-map="new-hi">new标题</h2>
//     <div>new第一个div</div>
//     <div>new第二个div</div>
//     <div>
//       <span>new第三个div</span>
//     </div>
//     { 1 < 2 && <p>new1小于2</p>}
//     { 1 > 2 && <p>new1大于2</p>}
//     <input value={2}/>
//     <input type="radio" checked={true}/>
//     <button onClick={()=> alert('new点击按钮啦')}>new按钮</button>
//     <div>
//       <p>new有三个li</p>
//       <p>newul前的p</p>
//       <ul>  
//         <li>new111</li>
//         {/* <li>new222</li> */}
//         <li>new333</li>
//       </ul>
//     </div>
//   </div>
// );

// TinyReact.render(element, document.getElementById('root'));

// setTimeout(()=>{
//   TinyReact.render(newElement, document.getElementById('root'));
// }, 3000)

/**
 * 5、测试 render -> diff -> updateElement -> updateComponentElement（不带key版）
 */
// import TinyReact, { Component } from './tiny-react';

// const FuncComp = (props) => {
//   return (
//     <div>
//       <p>this is func comp</p>
//       <p>this is func comp props title：{props.title}</p>
//       <button  onClick={props.onClick}>函数组件按钮</button>
//     </div>
//   )
// }

// class ClassComp extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <p>this is class comp</p>
//         <p>this is class comp props title：{this.props.title}</p>
//         <button  onClick={this.props.onClick}>类组件按钮</button>
//       </div>
//     )
//   }
// }

// const element = (
//   <div>
//     <h1 className="h1-class" data-map="hi">标题</h1>
//     <div>第一个div</div>
//     <div>第二个div</div>
//     <div>
//       <span>第三个div</span>
//     </div>
//     { 1 < 2 && <p>1小于2</p>}
//     { 1 > 2 && <p>1大于2</p>}
//     <input value={1}/>
//     <input type="radio" checked={false}/>
//     <button onClick={()=> alert('点击按钮啦')}>按钮</button>
//     <div>
//       <p>有三个li</p>
//       <p>ul前的p</p>
//       <ul>  
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//       </ul>
//     </div>
//     <FuncComp title="funcCompTitle"  onClick={()=> alert('点击函数组件按钮啦')}/>
//     <ClassComp title="classCompTitle" onClick={()=> alert('点击类组件按钮啦')}/>
//   </div>
// );

// const newElement = (
//   <div>
//     <h2 className="new-h1-class" data-map="new-hi">new标题</h2>
//     <div>new第一个div</div>
//     <div>new第二个div</div>
//     <div>
//       <span>new第三个div</span>
//     </div>
//     { 1 < 2 && <p>new1小于2</p>}
//     { 1 > 2 && <p>new1大于2</p>}
//     <input value={2}/>
//     <input type="radio" checked={true}/>
//     <button onClick={()=> alert('new点击按钮啦')}>new按钮</button>
//     <div>
//       <p>new有三个li</p>
//       <p>newul前的p</p>
//       <ul>  
//         <li>new111</li>
//         {/* <li>new222</li> */}
//         <li>new333</li>
//       </ul>
//     </div>
//     <FuncComp title="new-funcCompTitle"  onClick={()=> alert('new点击函数组件按钮啦')}/>
//     <ClassComp title="new-classCompTitle" onClick={()=> alert('new点击类组件按钮啦')}/>
//   </div>
// );

// TinyReact.render(element, document.getElementById('root'));

// setTimeout(()=>{
//   TinyReact.render(newElement, document.getElementById('root'));
// }, 3000)


/**
 * 6、测试 render -> diff -> updateElement -> updateNativeElement（带key版）
 */
import TinyReact, { Component } from './tiny-react';

class ClassComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        {
          name: '奶茶',
          key: 1,
        },
        {
          name: '烧烤',
          key: 2
        },
        {
          name: '冰淇淋',
          key: 3
        }
      ]
    }
    this.addOne = this.addOne.bind(this);
    this.delOne = this.delOne.bind(this);
  }

  addOne() {
    const newArr = [...this.state.arr];
    const random = Math.random();
    newArr.splice(1, 0, {
      name: random,
      key: random
    })
    this.setState({
      arr: newArr
    })
  }

  delOne() {
    const newArr = [...this.state.arr];
    newArr.pop();
    this.setState({
      arr: newArr
    })
  }

  render() {
    return (
      <div>
        <ul>  
          {
            this.state.arr.map(a=>(
              <li key={a.key}>{a.name}</li>
            ))
          }
        </ul>
        <button onClick={this.addOne}>往第一个后插入一个</button>
        <button onClick={this.delOne}>删除最后一个</button>
      </div>
    )
  }
}

TinyReact.render(<ClassComp/>, document.getElementById('root'));