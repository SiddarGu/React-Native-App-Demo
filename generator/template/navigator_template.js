// React & React Native
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
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
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';

// Constants

// Custom Components

const __name__Stack = createStackNavigator();
export default AccountNavigator = () => {
  return (
    <__name__Stack.Navigator>
      <__name__Stack.Screen
        name=""
        component={}
        options={{}}
      />
      <__name__Stack.Screen
        name=""
        component={}
        options={{}}
      />
    </__name__Stack.Navigator>
  );
}
