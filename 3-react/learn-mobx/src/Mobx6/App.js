import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { autorun, reaction, runInAction } from 'mobx';
import { useRootStore } from './stores';

const App = () => {
  const { counterStore } = useRootStore();
  const { 
    count, 
    username, 
    increment, 
    decrement, 
    getUsers,
    getTotal, 
    changeUsername
  } = counterStore;

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    let count = counterStore.count;
    autorun(() => {
      // 错误写法， mobx 跟踪不到变量 count
      console.log(count);
    })
  },[])

  useEffect(() => {
    const person = counterStore.person;
    autorun(() => {
      console.log(person.name);
    })
  },[])

  useEffect(() => {
    reaction(
      () => counterStore.person.name,
      (curr, prev) => {
        console.log('curr', curr);
        console.log('prev', prev)
      }
    )
  },[])


  return (
    <div>
      <button onClick={()=> increment()}>+</button>
      <span>{count}</span>
      <button onClick={() => decrement()}>-</button>
      <span> total: {getTotal}</span>
      <div>
        <input 
          type='text' 
          value={username} 
          onChange={(e) => changeUsername(e.target.value)}
        />
        {username}
      </div>
      <div>
        <p>{counterStore.person.name}</p>
        <button onClick={()=> runInAction(() => { counterStore.person.name = '李四' })}>李四</button>
        <button onClick={()=> runInAction(() => { counterStore.person = {name: '王五'} })}>王五</button>
      </div>
      {
        counterStore.users.map(u => (
          <div key={u.id}>
            <span>id:{u.id}</span>
            <span>login:{u.login}</span>
          </div>
        ))
      }
    </div>
  );
};

// 通过 observer 包裹函数组件，监控当前组件使用到的由 Mobx 追踪的 observable state，当状态变化时，通知 React 更新视图
export default observer(App);