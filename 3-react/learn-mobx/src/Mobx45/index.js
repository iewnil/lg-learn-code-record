import React from 'react';
import { Provider } from 'mobx-react';
import App from './App';
import counterStore from './stores/counterStore';

const Index = () => {
  return (
    <Provider counterStore={counterStore}>
      <App />
    </Provider>
  );
};

export default Index;