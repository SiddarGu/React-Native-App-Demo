import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import FabOverlay from '../screens/HomeScreen/FabOverlay';
import BugReportScreen from '../screens/FeedbackScreen/BugReportScreen';
import FeedbackScreen from '../screens/FeedbackScreen/FeedBackScreen';

const FabStack = createStackNavigator();

export default function FabNavigator() {
  return (
    <FabStack.Navigator>
      <FabStack.Screen name="BugReport" component={BugReportScreen} />
      <FabStack.Screen name="Feedback" component={FeedbackScreen} />
      <FabStack.Screen name="FabOverlay" component={FabOverlay} />
    </FabStack.Navigator>
  );
}
