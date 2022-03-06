import { createContext, useContext } from 'react';
import counterStore from './counterStore';

const Context = createContext();

class RootStore {
  constructor () {
    this.counterStore = counterStore;
  }
}

const rootStore = new RootStore();

const RootStoreProvider = ({ children }) => {
  return <Context.Provider value={rootStore}>{children}</Context.Provider>
}

const useRootStore = () => {
  const rootStore = useContext(Context);
  return rootStore;
}

export {
  rootStore,
  RootStoreProvider,
  useRootStore,
}