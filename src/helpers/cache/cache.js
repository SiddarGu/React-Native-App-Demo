import AsyncStorage from '@react-native-async-storage/async-storage';

export {readCache, writeCache, removeCache};

const readCache = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log('READ CACHE ERROR:', e);
    return null;
  }
};

const writeCache = async (key, obj) => {
  try {
    const value = JSON.stringify(obj);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('WRITE CACHE ERROR:', e);
  }
};

const removeCache = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('REMOVE CACHE ERROR:', e);
  }
};
