

import React, { useState } from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';

// Third-Party
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { utils } from '@react-native-firebase/app';
import { observer } from 'mobx-react';

// Context
import { useStores } from '@stores';
import { LocalizationProvider } from '@composables/useTranslation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Custom Components
import RootNavigator from '@navigations/RootNavigator';

export default App = observer(() => {
  const { themeStore } = useStores();
  return (
    <LocalizationProvider>
      <PaperProvider theme={themeStore.theme.app}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <NavigationContainer theme={themeStore.theme.app}>
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
        <StatusBar barStyle={themeStore.theme.statusbar} />
      </PaperProvider>
    </LocalizationProvider>
  );
});

const styles = StyleSheet.create({});
