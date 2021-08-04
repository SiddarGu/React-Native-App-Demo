// React & React Native
import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

// Third-party
import {createStackNavigator} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {
  Divider,
  useTheme,
  Title,
  Subheading,
  Portal,
  Dialog,
  Button,
  Surface,
} from 'react-native-paper';

// Context
import {useStores} from '@stores';
import {useTranslation} from '@composables/useTranslation';
import SettingsScreen from '@screens/SettingsScreen/SettingsScreen';
import ChangeProfileScreen from '@screens/SettingsScreen/ChangeProfileScreen';
import ChangeLocationScreen from '@screens/SettingsScreen/ChangeLocationScreen';
// Constants
const textPaddingLeft = 14;
const dividerMarginLeft = textPaddingLeft;
// Custom Components

const SettingsNavigatorStack = createStackNavigator();
export default AccountNavigator = ({ navigation }) => {

  const {translations} = useTranslation();

  return (
    <SettingsNavigatorStack.Navigator>
      <SettingsNavigatorStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{title: translations['settings']}}
      />
      <SettingsNavigatorStack.Screen
        name="ChangeProfileScreen"
        component={ChangeProfileScreen}
        options={{title: translations['change_profile']}}
      />
      <SettingsNavigatorStack.Screen
        name="ChangeLocationScreen"
        component={ChangeLocationScreen}
        options={{title: translations['change_location']}}
      />

    </SettingsNavigatorStack.Navigator>
    
  );
};

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
