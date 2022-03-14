import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ClassCompErrorCatch from './ClassCompErrorCatch';

ReactDOM.render(
  <React.StrictMode>
    <ClassCompErrorCatch>
      <App />
    </ClassCompErrorCatch>
  </React.StrictMode>,
  document.getElementById('root')
);
