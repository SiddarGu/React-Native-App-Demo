import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import IndexNavigator from '@navigations/IndexNavigator';
import AccountNavigator from '@navigations/AccountNavigator';
import FabNavigator from '@navigations/FabNavigator';
import { useStores } from '../stores';
import { observer } from 'mobx-react';
import SettingsNavigator from './SettingsNavigator';
import MessageNavigator from './MessageNavigator';

const RootStack = createStackNavigator();

export default RootNavigator = observer(() => {
  const { userStore } = useStores();
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Index"
        component={IndexNavigator}
        options={{ headerShown: false }}
      />
      
      <RootStack.Screen
        name="Feedback"
        component={FabNavigator}
        options={{ headerShown: false }}
      />
      
      <RootStack.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
});

const styles = StyleSheet.create({});
