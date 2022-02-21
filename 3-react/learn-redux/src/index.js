import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './redux-example/Counter';
import store from './redux-example/store';

store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>,
    document.getElementById('root')
  );
})

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById('root')
);

