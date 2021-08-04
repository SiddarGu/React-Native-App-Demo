import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../screens/MessageScreen/MessageScreen';

const MessageStack = createStackNavigator();

export default function MessageNavigator({route}) {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="Message"
        component={MessageScreen}
        options={{ title: route.params.name }}
        initialParams={route.params}
      />
    </MessageStack.Navigator>
  );
}