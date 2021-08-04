import React from 'react';
import { useTranslation } from '@composables/useTranslation';

// import { default as theme } from "./custom-theme.json"; // <-- Import app theme

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/IndexScreen/HomeScreen';
import HomeScreenWrapper from '../screens/IndexScreen/HomeScreenWrapper';

import ProfileScreen from '../screens/IndexScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InboxNavigator from '@navigations/InboxNavigator';
import { useStores } from '../stores';
import { TouchableOpacity, View } from 'react-native';
const BottomTab = createMaterialTopTabNavigator();
const HomeNavigatorStack = createStackNavigator();

export default function IndexNavigator() {
  const { themeStore } = useStores();
  const { translations } = useTranslation();

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: themeStore.theme.colors.primary,
        inactiveTintColor: 'gray',
        showLabel: false,
        tabStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
        showIcon: true,
        indicatorStyle: { backgroundColor: 'transparent' },
      }}>
      

      <BottomTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              style={{ textAlign: 'center', color: color }}
              name={'home'}
              size={20}
            />
          ),

          title: translations['home'],
        }}
        component={HomeScreenWrapper}
      />
      <BottomTab.Screen
        name="Inbox"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              style={{ textAlign: 'center', color: color }}
              name={'message'}
              size={20}
            />
          ),
          title: translations['inbox'],
        }}
        component={InboxNavigator}
      />

      <BottomTab.Screen
        name="Me"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              style={{ textAlign: 'center', color: color }}
              name={'person'}
              size={20}
            />
          ),
          title: translations['me'],
        }}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}
