import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '@screens/profile';
import BuilderScreen from '@screens/builder';
import { APP_SCREEN } from './screen-types';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import { icons } from '@assets/icon';
import { Icon } from '@components/icon';
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
  [APP_SCREEN.PROFILE]: {
    icon: ({ focused }) => (
      <Icon
        colorTheme={focused ? 'primary' : 'secondary'}
        icon={'profile'}
      />
    ),
  },
  [APP_SCREEN.BUILDER]: {
    icon: ({ focused }) => (
      <Icon
        colorTheme={focused ? 'primary' : 'secondary'}
        icon={'file_transfer'}
      />
    ),
  },
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
      tabBar={props => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen
        name={APP_SCREEN.BUILDER}
        component={BuilderScreen}
        options={{
          title: 'Builder',
          tabBarLabel: 'Builder',
          headerShown: false
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};
