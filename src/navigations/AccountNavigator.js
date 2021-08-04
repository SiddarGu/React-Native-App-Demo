import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '@screens/AccountScreen/SignInScreen';
import SignUp from '@screens/AccountScreen/SignUpScreen';

const AccountStack = createStackNavigator();
export default function AccountNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: '登录', headerBackTitleVisible: false }}
      />
      <AccountStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: '注册', headerBackTitleVisible: false }}
      />
      
    </AccountStack.Navigator>
  );
}
