import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('counterStore') // 注入 store
@observer // 通过 @observer 将 App 组件变为观察者
class App extends Component {

  componentDidMount() {
    this.props.counterStore.getUsers();
  }

  render() {
    const { counterStore } = this.props;
    const { 
      increment, 
      decrement, 
      count, 
      getTotal, 
      username, 
      changeUsername
    } = counterStore;

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
        {
          counterStore.users.map(u => (
            <div key={u.id}>
              <span>id:{u.id}</span>
              <span>login:{u.login}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

export default App;
