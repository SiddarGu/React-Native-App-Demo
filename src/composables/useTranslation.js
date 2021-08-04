// https://lokalise.com/blog/react-native-localization/
// Stores our selected language in the local database.
// This way, the next time we open the app, we use that language automatically without having to select it again.
import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Internationalizes React Native application. This library uses a native library to get the current interface language.
// Then it loads and displays the strings matching the current interface locale or the default language if a specific localization can’t be found.
import LocalizedStrings from 'react-native-localization';
// Provides a toolbox for React Native app localization. It lets us find available locales, time, country, and calendar.
// It even searches for the best available languages from our device so that we can use it to apply localization.
import * as RNLocalize from 'react-native-localize';
import en from '@constants/langs/en.json';
import zh from '@constants/langs/zh.json';
const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';
const languages = { en, zh };
// Contains all our localized translations depending on the language specified.
// We pass it through LocalizedStrings method from react-native-localization.
const translations = new LocalizedStrings(languages);

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const useTranslation = () => useContext(LocalizationContext);

export const LocalizationProvider = ({ children }) => {
  // 9
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  // 11
  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };
  // 12
  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };
  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage, // 10
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
