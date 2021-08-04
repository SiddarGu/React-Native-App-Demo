import { makeAutoObservable, runInAction } from 'mobx';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export class __name__ {
  constructor(rootStore) {
    // initialize observing varibles here

    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }
}
