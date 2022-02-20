# react-hooks

> 注意：以下的所有特性都是基于**函数组件**进行分析的。

## 官方

> 文档地址：https://react.docschina.org/docs/hooks-intro.html

## 文章阅读

这里对网易云音乐大前端团队的文章阅读总结

> 原文地址：https://juejin.im/post/6844904165500518414#heading-0

### 一帧

参考文章的想法，对于class组件 render 函数的每次调用 或者 函数组件的执行，我们称它为一帧。

> 注：`useState` 的 `set`（值有改变时）会造成函数组件重新调用，也就是开启新的一帧。

### 每一帧拥有独立的变量

> 代码地址：https://codesandbox.io/s/serverless-microservice-35z1y?fontsize=14&hidenavigation=1&module=/src/Example.js&theme=dark&file=/src/index.js

#### 示例

先看一下子组件函数组件示例：

```js
// 子组件函数组件
function Example(props) {
    const { count } = props;
    const handleClick = () => {
        setTimeout(() => {
            alert(count);
        }, 3000);
    };
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>Alert Count</button>
        </div>
    );
}
```

它的 `count` 属性是由父组件传入的，初始值为0，在父组件中每秒会对 `count` 进行 + 1。

在 `<Example/>` 子组件中，点击 <kbd>Alter Count</kbd> 按钮，3秒后，会在弹出框中显示 `count` 的值，发现`count` 值不是由父组件传入的最新的值（可能是 3），而是点击 <kbd>Alter Count</kbd> 按钮时的值（可能是0）。

#### 为什么呢？

因为 `<Example>`  是函数组件，当父组件重新渲染时，则 `props` 作为该函数的参数传入，并**重新调用**函数组件，`props`参数是**函数作用域下的变量**。

> 注意：上面提到的，props 是父组件中的状态，且父组件重新渲染，才会导致重新调用函数子组件。

我们都知道在函数中传入参数，实际上等同于在当前函数的作用域下新声明了一个变量：

```js
// 子组件函数组件
function Example(props) {
    const props = props;
}
```

当父组件传入的 `count` 变为 `1`，`React` 会再次调用 `Example` 函数，执行第二帧，此时 `count` 是 `1`。

#### 那 class 类组件呢？

```js
// 子组件类组件
class Example2 extends Component {
    handleClick = () => {
        setTimeout(() => {
            alert(this.props.count);
        }, 3000);
    };

    render() {
        return (
            <div>
                <h2>Example2</h2>
                <p>{this.props.count}</p>
                <button onClick={this.handleClick}>Alert Count</button>
            </div>
        );
    }
}

```

在 `<Example2>` class 组件中，我们是从 `this` 中获取到的 `props.count`。`this` 是固定的**指向同一个组件实例的**。在 `3` 秒的延时器生效后，组件重新进行了渲染（其实就是调用了render函数），`this.props` 也发生了改变，但 `this` 指向的实例还是那个实例。

所以当延时的回调函数执行时，读取到的 `this.props` 是当前组件实例最新的属性值。

> 注意：类组件在创建时，每一个组件都是一个特定的实例，而 `this` 指向这个实例。

### 每一个组件拥有同一个状态

> 这一节的理解与原文中会有所差异，存疑，可以对比阅读，进行讨论。
>
> 原文中首先写的是每一帧，我这里的每一个组件的意思是：每一个jsx，也就是vdom，或者说是由同一个函数组件执行创建的jsx。

#### useState

```js
const [state, setState] = useState(initialState);
```

- `useState` 为当前的函数组件创建一个状态，这个状态的值与更改状态的 `set` 是**独立于函数组件外存放的**。
- `set` （值有改变时）会让函数组件重新调用（更新渲染），其子组件也会重新调用。
- 补充：`props`的更改不会造成函数组件重新调用，但如果是它的父组件重新渲染会。

> 这里我的理解是：
>
> 同一个函数组件在其父组件重新渲染或者内部状态变更（执行 `set` ）时，会被**多次调用**（这里称为新的一帧），但通过` useState` 创建的状态是**共用**的**同一个**，换句话说，虽然函数组件被调用了多次，但都映射到同一个 `useState` 创建的状态上。

所以，在之前研究函数组件的挂载渲染和更新渲染（v-if和v-show）时，谈到，在组件重新挂载渲染时， `useState` 状态的初始赋值是会生效的（创建了新的状态），但如果是更新渲染（执行 `set` ）时，初始赋值就不会执行。

换句话说，在重用的过程中，这些状态会得到保留。而如果无法重用，状态会被销毁。

#### 每一帧拥有独立的状态

> 代码地址：https://codesandbox.io/s/hardcore-fast-66u24?fontsize=14&hidenavigation=1&theme=dark&file=/src/Example2.js

这里的一帧指的就是一次函数组件的调用了，每一次函数组件的调用，都会执行 `useState`，并把组件映射的值通过**数组解构**，赋值给单独一帧的值——>> **快照**。

##### 示例

```js
function Example2() {
    // 这里的 count 是每一帧独立的状态，通过useState创建的结果解构赋值
	// useState 创建的状态：是函数组件不同帧映射的、独立于函数组件外存放的状态
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setTimeout(() => {
            setCount(count + 1); // 闭包
        }, 3000);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                setCount
            </button>
            <button onClick={handleClick}>
                Delay setCount
            </button>
        </div>
    );
}
```

在第一帧中（也就是第一次执行函数组件），`p` 标签中的文本为 `0`。点击 <kbd>Delay setCount</kbd>，文本依然为 `0`。随后在 `3` 秒内连续点击 <kbd>setCount</kbd> 两次，将会分别执行第二帧和第三帧。你将看到 `p` 标签中的文本由 `0` 变化为 `1`,` 2`。但在点击 <kbd>Delay setCount</kbd> `3` 秒后，文本重新变为 `1`。

##### 闭包

> 通过 `setTimout`箭头函数延时调用时，我们可以很快分析出，其实产生了**闭包**，造成了 `setTimeout`里的箭头函数对外部函数组件 `count`变量的持有，所以箭头函数在 `3` 秒后返回的是前一帧的状态值了。
>
> 由此可以看出 `count` 是每一帧的独立状态，相当于每次执行的函数组件内部的一个变量而已，每一帧的状态值都是通过 `useState` 获取到最新的值。

##### 解决闭包

> https://reactjs.org/docs/hooks-reference.html#functional-updates

```js
function Example2() {
    // 这里的 count 是每一帧独立的状态，通过useState创建的结果解构赋值
	// useState 创建的状态：是函数组件不同帧映射的、独立于函数组件外存放的状态
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setTimeout(() => {
            setCount( c => c + 1); // 通过传入回调函数，c得到是当前帧的值，避免了闭包
        }, 3000);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                setCount
            </button>
            <button onClick={handleClick}>
                Delay setCount
            </button>
        </div>
    );
}
```

### 每一帧共享的状态

其他情况下，例如需要读取到上一帧或者未来某帧的 `state` ，就可以使用 `useRef`，通过它来拥有一个在所有帧中**共享**的变量。

> 代码地址：https://codesandbox.io/s/recursing-dan-b1syo?fontsize=14&hidenavigation=1&theme=dark

#### useRef

useRef 可以用于`访问DOM节点或React组件实例和作为容器保存可变变量`

**官方的说法**：

- useRef 不仅适用于 DOM 引用。 “ref” 对象是一个通用容器， `其 current 属性是可变的，可以保存任何值（可以是元素、对象、基本类型、甚至函数）`
- **更新Ref** 是副作用操作，我们不应该在`render-parse（渲染阶段）`更新，而是在`useEffect或者useLayoutEffect`去完成副作用操作。

```js
const refContainer = useRef(initialValue);
```

在组件的第一帧中，`refContainer.current` 将被赋予初始值 `initialValue`，之后便不再发生变化。但你可以自己去设置它的值。设置它的值不会重新触发 render 函数。

> 附：createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回**相同的引用**。

#### 示例 解决闭包

```js
import React, { useState, useRef } from "react";

function Example() {
  const [count, setCount] = useState(0);

  const currentCount = useRef(count);

  // const prevCount = currentCount.current; // 看这里，相当于记录了先前帧的状态。
    
  currentCount.current = count; // 看这里，给共享状态赋最新值。
    
  const handleClick = () => {
    setTimeout(() => {
      // 再看这里，即解决了闭包，在3秒后能获得未来某帧最新的值，也相当于获得了preCount。
      setCount(currentCount.current + 1);  
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <button onClick={handleClick}>Delay setCount</button>
    </div>
  );
}

export default Example;
```

#### 获取子组件“实例”

比如想获取子组件的实例，通常是这样：

```js
const Father = ()=>{
    const childRef = createRef();
    
    useEffect(()=>{
       // 想在这里通过子组件实例，调用子组件的方法
       childRef.doSomething(); 
    },[])
    
	return <Child ref={childRef}/>    
}
```

以上的做法，如果是 class 组件可能还行得通，**函数组件就不行了**。

>  因为函数组件没有实例，如果想用ref获取子组件的实例，子组件组要写成类组件

所以可以通过 useRef hooks 这样做：

```js
const Father = React.createRef ( ()=>{
    const childRef = useRef();
    
    useEffect(()=>{
       // 但是要在子组件中暴露doSomething
       childRef.current.doSomething(); 
    },[])
    
	return <Child ref={childRef}/>    
})
```

> 注意：
>
> - createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。
> - 使用 `React.forwardRef` API是转发 `ref` 拿到子组件的DOM中想要获取的节点，并不是获取实例。

### 每一帧可以拥有独立的Effects回调函数

> `useEffect` 在每次渲染都会执行，但是里面的回调函数不一定得执行，所以是”可以拥有“。

> 对于 `useEffect` 来说，执行的时机是完成所有的 DOM 变更并让浏览器渲染页面后，而 `useLayoutEffect` 和 class 组件中 `componentDidMount`, `componentDidUpdate`一致——在 React 完成 DOM 更新后马上同步调用，会阻塞页面渲染。

如果 `useEffect` 没有传入第二个参数，那么第一个参数传入的 `effect 回调函数` 在每次函数组件执行时，都是独立的。每个回调函数中捕获的 `props` 或 `state` 都来自于那一帧。

#### 示例

```js
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log(`You clicked ${count} times`); // 这里同样是闭包
        }, 3000);
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}

```

如果我们不停地点击 <kbd> Click me</kbd>按钮，打印的结果是什么呢？

- 我们发现经过延时后，每个 `count` 的值被依次打印了，他们从 `0` 开始依次递增并输出，且不重复。

如果换成 `class` 组件，尝试使用 `componentDidUpdate` 去实现呢？

- 那必然是，依次重复输出最后点击 <kbd> Click me</kbd>按钮时的值。

  ```js
  componentDidUpdate() {
      setTimeout(() => {
          console.log(`You clicked ${this.state.count} times`);
      }, 3000);
  }
  ```

  `this.state.count` 总是指向最新的 `count` 值。

#### 避免多次调用Effect的坑

相信大家都会像下面的代码一样：当某个副作用里的值依赖于某个 `state` 时，为了避免多次调用 `effect` ，我们会在第二个参数中填入它的依赖项数组。

```js
const [count, setCount] = useState(0);

useEffect(() => {
    const id = setInterval(() => {
        setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
}, [count]);
```

首先考虑的是：当我们频繁更改 `count` 时，每次执行 `effect` ，上一次的计时器都会被清除，需要调用 `setInterval` 重新进入时间队列，实际的定期时间被**延后**，甚至有可能根本没有机会被执行（即使此时的 `count` 是来自最新那一帧值。

于是我们可能就会像下面这样：

> 直接把 `count` 从依赖中去除？

```js
const [count, setCount] = useState(0);

useEffect(() => {
    const id = setInterval(() => {
        setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
}, []);
```

按照这种实践方式，`count` 变化时，我们并不希望重新 `setInterval`，故 deps 为空数组。这意味着该 hook 只在组件挂载时运行一次。Effect 中明明依赖了 `count`，但我们撒谎说它没有依赖，那么当 `setInterval` 回调函数执行时，获取到的 `count` 值永远为 `0`。（闭包问题又出现了）

所以我们肯定会用下面的最佳的解决方式：

```js
setCount(c => c + 1);
```

甚至还可以这样：

```js
const [count, setCount] = useState(0);
const countRef = useRef();
countRef.current = count;

useEffect(() => {
    const id = setInterval(() => {
        console.log(countRef.current);
    }, 1000);
    return () => clearInterval(id);
}, []);
```

这样就避免了多次调用 effect 导致多次创建销毁定时器。

同样的场景也可以用在：绑定事件函数等，只在初始时绑定一次。

### 性能优化

#### useEffect

我们通过 depts 依赖项数组来减少 `effect` 的调用次数，算是一种优化，但是有些时候可能不能得到解决：

- 第一种是上面所讨论的，减少了 `effect` 的调用次数，却增加了创建销毁的开销。

- 第二种是：Effects 依赖了**函数或者其他引用类型**。与原始数据类型不同的是，在未优化的情况下，每次 render 函数调用时，因为对这些内容的重新创建，其值总是发生了变化，导致 Effects 在使用 deps 的情况下依然会频繁被调用。

  > 对于函数，使用 useCallback 避免重复创建。
  >
  > 对于对象或者数组，则可以使用 useMemo，从而减少 deps 的变化。？？？

#### memo/useMemo

> 我们知道，父组件重新渲染（`useState` 的 `set`（值有改变时）会造成函数组件重新调用）时，子组件也会跟着渲染。

假设有这样一种场景：

父组件拥有 `count` 与 `id` 两个状态，父组件会在将来改变 `count` 的值，而传入子组件的 `id` 则不会改变，可是由于父组件执行了 `setCount` 方法来改变 `count`的值，父组件重新渲染，会导致子组件也重新渲染，有没有什么方法来避免子组件重新渲染呢？

##### 使用

```js
import React,{useState,useMemo,memo,useEffect} from 'react';
import ReactDOM from 'react-dom';


const Father = ()=>{
  const [count,setCount] = useState(0);
  const [id,setId] = useState('1');

  console.log('father函数组件执行啦')

  // 通过useMemo，可以对Child进行缓存，如果id没有改变的话，则复用。
  const MemoChild = useMemo(() => (
    <Child id={id} count={count} />
  ), [id]);

  return (
    <>
      <div>Father</div>
      <button onClick={()=>{ setCount(count + 1)}}>add count</button>
      {MemoChild} 
	  {/* <Child2 id={id} count={count}/> */}
    </>
  )
}

const Child =(props)=>{
  console.log('child函数组件执行啦')

  useEffect(() => {
    console.log('child渲染啦')
  })

  return (
    <div>child</div>
  )
}

// 通过高阶组件的调用也是可以的
const Child2 = memo(Child)

ReactDOM.render(
  <Father/>,
  document.getElementById('root')
)
```

这里总结就是：对需要缓存的组件外面包了一层后，就能达到优化的目的了。

当然了，`useMemo` 还可以写在需要缓存的组件内部：

```js
function Child({ color }) {
 // color值不发生改变不会打印console，但是依旧会触发重新渲染。
    const actionColor = useMemo(() => {
        console.log('color update')
        return color
    }, [color])

    return <div style={{ actionColor }}>{actionColor}</div>
}
```

要注意的是，写在内部的话，就算 `color`不变，缓存的函数组件其实还是会渲染（重新执行），只是有些额外的计算开销可以避免执行，像这种情况的话，用  `useCallback` 是一样的，语义化还更好。

> ```js
> const newFunc = useCallback(computedFunc,[..])
> // 等同于===>
> const newFunc = useMemo((...)=>{ computedFunc() },[...])
> ```
>

##### 项目实践

这里以项目开发过程中的运用举例说明：

- 封装了服务拓扑组件
- 需要在首页中引入服务拓扑组件
- 因为这个组件比较复杂，多次渲染的话，感觉会影响性能？
- 利用useMemo避免多次渲染

TopoGrpah.jsx

```js
// TopoGrpah.jsx
// 在组件中打印日志，作为渲染次数的判断

  useMount(() => {
    console.log('topograph mount');
    initTopo();
    return () => {
      graph.destroy();
    };
  });

  useEffect(() => {
    console.log('topograph 渲染了');
  });
```

dsahboard.js

```js
// dsahboard.js
// 在首页中引入服务拓扑组件
<TopoGraph showTop={false} ref={topoGraphRef} />
```

首页组件挂载渲染后，查看打印的结果：

![image-20200929163015514](C:\Users\87494\AppData\Roaming\Typora\typora-user-images\image-20200929163015514.png)

> 原因分析：
>
> 因为在首页组件在进行了connect包装后，在组件挂载后，会发送异步请求，当数据返回时，传给组件的 props 就会发生改变，组件会重新渲染，导致 topoGraph 子组件多次重新渲染。

在首页组件中调用多个 setState，查看渲染结果：

![image-20200929170401618](C:\Users\87494\AppData\Roaming\Typora\typora-user-images\image-20200929170401618.png)

> 原因分析：
>
> 在首页组件中，进行某种搜索操作的时候，会调用多个 setState，比如：设置当前搜索的值、搜索的id等，会导致首页组件多次渲染，从而导致 topoGraph 子组件也多次重新渲染

使用 useMemo 进行优化：

```js
// dsahboard.js
// 在首页中引入服务拓扑组件

//缓存服务拓扑图  
const memoTopoGraph = useMemo(() => <TopoGraph showTop={false} ref={topoGraphRef} />, []);
```

> 这里 [] 代表只缓存一次，以后不管父组件怎么渲染，子组件都用的这一个，这样写的目的是因为子组件没有依赖父组件状态，如果有的话，我们要往里面加入依赖。

首页组件挂载渲染，查看渲染结果：

![image-20200929163553006](C:\Users\87494\AppData\Roaming\Typora\typora-user-images\image-20200929163553006.png)

首页组件多次 setState 更改状态时，查看渲染结果：

![image-20200929163641276](C:\Users\87494\AppData\Roaming\Typora\typora-user-images\image-20200929163641276.png)

> 没有日志打印，说明子组件缓存成功了！虽然父组件状态改变后，会多次渲染，但是子组件却没有渲染！

#### useCallback

在组件渲染时，一些会跟着组件渲染而再次执行的、高开销、高计算的函数可以通过 `useCallback` 来暂存优化。

useCallback 常常配合 `React.memo` 来一起使用，用于进行性能优化。

> 更多情况，useCallback一般用于在 React 中给事件绑定函数并需要传入参数的时候。

##### 使用

在我们编写 React 组件的时候，经常会用到事件处理函数，很多人都会简单粗暴的传一个箭头函数。

```js
function App(){
    const [ count, setCount ] = useState(0);
    const [ inputValue, setInputValue ] = useState('');
    
    const onChange = (e) => {
        setInputValue(e.target.value);
    }
    
    const increment = () => {
        setCount(count + 1);
    }
    
    return (
    	<>
        	<Input value={inputValue} onChange={onChange} />
        	<div onClick={increment}>{count}</div>
        </>
    )
}
```

这种箭头函数有个问题，那就是在每一次组件重新渲染的时候都会生成一个重复的匿名箭头函数，导致传给组件的参数发生了变化，对性能造成一定的损耗。

```js
function App(){
    const [ count, setCount ] = useState(0);
    const [ inputValue, setInputValue ] = useState('');
    
    const onChange = useCallback((e) => {
        setInputValue(e.target.value);
    },[])
    
    const increment = useCallback(() => {
        setCount(count + 1);
    },[count])
    
    return (
    	<>
        	<Input value={inputValue} onChange={onChange} />
        	<div onClick={increment}>{count}</div>
        </>
    )
}
```

这就是体现 useCallback 价值的地方了，我们可以用 useCallback 指定依赖项。在无关更新之后，通过 useCallback 取的还是上一次缓存起来的**函数**。

> 注：这里再提醒一下，就算 onChange 的函数已经被缓存了，不代表 Input 组件就不会重新渲染了，还是需要通过 memo/useMemo 包裹成新组件，才能避免重新渲染。

#### 惰性初始 state

> https://react.docschina.org/docs/hooks-reference.html

`initialState` 参数只会在组件的初始渲染中起作用（挂载时），后续渲染时会被忽略。

如果初始 state 需要通过**复杂计算**获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

如果像下面这样的话，可能就会有性能问题：

```js
const initialState = someExpensiveComputation(props);
const [state, setState] = useState(initialState);
```

因为我们知道，在函数组件重新渲染时，其实是重新调用函数组件，所以在函数组件中的语句都会被执行一遍，除了一些特殊的 `hooks`函数。

而在这里 `someExpensiveComputation()` 只是用来计算初始 `state` 的，所以完全可以放入 `useState` 的回调函数中。

### 剩余的 hooks

#### useReducer

`useReducer` 和 `useState` 的用法很相似。

- `useReducer` 是最最最简易版的 `redux`

  还可以通过 useReducer + useContext 实现一个 redux （不包含异步操作的）

- `useReducer` 接收一个 `reducer` 函数和初始 `state`，返回了 `state` 和 `dispatch` 函数，常常用于管理一些**复杂的状态**，适合 `action` 比较多的场景

##### 使用

```js
function Counter() {
    
    const countReducer = (state, action) => {
        switch(action.type){
            case 'increment':
                return state + 1;
            case 'decrement':
                return state - 1;
            default:
                return state;
        }
    };
    
    const [ count, dispatch ] = useReducer(countReducer,0);
    
    return (
    	<div>
        	<h1>{count}</h1>
        	<button onClick={() => dispatch({ type: "increment" })}>
        		increment
			</button>
			<button onClick={() => dispatch({ type: "decrement" })}>
                decrement
			</button>
		</div>
    )
}
```

#### useContext

##### 使用

```js
const Context = createContext(null);

function App() {
    return (
    	<Context.Provider value={{ title: "hello, world"}}
    		<Child />
      	</Context.Provider>
    )
}

function Child() {
    const context = useContext(Context);
    return <h1>{ context.title }</h1>
}
```

#### 实现一个简单的 Redux

通过 useReducer 和 useContext，我们完全可以实现一个小型的 Redux。

##### reducer.js

```js
export const reducer = (state, action) => {
    switch(action.type){
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
}

export const defaultState = 0;
```

##### context.js

```js
export const Context = createContext(null);
```

##### App.js

```js
function App() {
    const [ state, dispatch ] = useReducer(reducer, defaultState);
    
    return (
    	<Context.Provider value={{state, dispatch}}>
        	<ChildOne />
        </Context.Provider>
    )
}

function ChildOne() {
	const { state, dispatch } = useContext(Context);
    
    return (
        <div>
        	<h1>{count}</h1>
        	<button onClick={() => dispatch({ type: "increment" })}>
        		increment
			</button>
			<button onClick={() => dispatch({ type: "decrement" })}>
                decrement
			</button>
		</div>
    )
}
```

# ahooks

是阿里巴巴开源的 `react-hooks` 库，由飞冰和umi等团队维护。

> 文档地址：https://ahooks.js.org/zh-CN



