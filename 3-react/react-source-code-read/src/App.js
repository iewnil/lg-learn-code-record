import * as React from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  // 直接取 props.key 在开发环境下，控制台会抛出错误信息
  // console.log(props.key);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
