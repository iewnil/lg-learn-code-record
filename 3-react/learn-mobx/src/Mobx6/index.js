import React from 'react';
import App from './App';
import { RootStoreProvider } from './stores';

// 同 mobx4/5 不同的是，不借助 mobx-react 的 Provider 下传，而是自定义 Context.Provider
const Index = () => {
  return <RootStoreProvider><App/></RootStoreProvider>
};

export default Index;