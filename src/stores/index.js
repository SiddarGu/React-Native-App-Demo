import { configure } from 'mobx';
import { createContext, useContext } from 'react';
import { ThemeStore } from './theme';
configure({ useProxies: 'never' });

/**
 * Combine all stores
 */
class RootStore {
  constructor() {
    this.themeStore = new ThemeStore(this);
  }
}

const rootStore = new RootStore();
const StoresContext = createContext(rootStore);

// this will be the function available for the app to connect to the stores
export const useStores = () => useContext(StoresContext);
