/**
 *  redux-example
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Counter from './redux-example/Counter';
// import store from './redux-example/store';

// store.subscribe(() => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <Counter />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// })

// ReactDOM.render(
//   <React.StrictMode>
//     <Counter />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


/**
 * react-redux example
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './react-redux-example/Counter';
import store from './react-redux-example/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);