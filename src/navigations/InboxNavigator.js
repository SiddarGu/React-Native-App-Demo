import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import InboxScreen from '../screens/IndexScreen/InboxScreen';
import { useTranslation } from '@composables/useTranslation';

const InboxStack = createStackNavigator();
export default function InboxNavigator() {
  const { translations } = useTranslation();

  return (
    <InboxStack.Navigator>
      <InboxStack.Screen
        name="messages"
        options={{ title: translations['messages'] }}
        component={InboxScreen}
      />
    </InboxStack.Navigator>
  );
}
