import { makeAutoObservable, runInAction } from 'mobx';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { readCache } from '@helpers/cache/cache';
import { writeCache } from '../helpers/cache/cache';

export class ThemeStore {
  theme;
  isDarkTheme;
  constructor(rootStore) {
    // initialize observing varibles here
    this.combinedDefaultTheme = {
      ...PaperDefaultTheme,
      colors: {
        bubbleRight: 'rgb(169,234,122)',
        bubbleLeft: 'rgb(255,255,255)',
        textRight: 'rgb(50,50,50)',
        textLeft: 'rgb(50,50,50)',

        primary: '#f7a440',
        accent: '#f7a440',
        background: '#f0f0f0',
        surface: '#ffffff',
        text: '#1e1e1e',
        disabled: '',
        placeholder: '',
        onSurface: '',
      },
    };
    this.combinedDarkTheme = {
      ...PaperDarkTheme,

      colors: {
        bubbleRight: 'rgb(89,178,105)',
        bubbleLeft: 'rgb(44,44,44)',
        textRight: 'rgb(6,18,10)',
        textLeft: 'rgb(213,213,213)',

        primary: '#f7a440',
        accent: '#f7a440',
        background: '#1e2733',
        surface: '#232d3c',
        text: '#e6ebf8',
        disabled: '',
        placeholder: '',
        onSurface: '',
      },
    };
    this.isDarkTheme = false;
    this.theme = this.combinedDefaultTheme;
    makeAutoObservable(this, {
      rootStore: false,
      combinedDarkTheme: false,
      combinedDarkTheme: false,
    });

    this.rootStore = rootStore;
    this.init();
  }

  async init() {
    const key = 'isDarkTheme';
    const isDarkThemeCache = await readCache(key);
    runInAction(() => {
      this.isDarkTheme = isDarkThemeCache;
      if (this.isDarkTheme) this.theme = this.combinedDarkTheme;
      else this.theme = this.combinedDefaultTheme;
    });
  }

  async toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) this.theme = this.combinedDarkTheme;
    else this.theme = this.combinedDefaultTheme;
    const key = 'isDarkTheme';
    await writeCache(key, this.isDarkTheme);
  }
}
