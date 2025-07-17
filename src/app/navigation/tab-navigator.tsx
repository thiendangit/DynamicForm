import React from 'react';

import { Icon } from '@components/icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuilderScreen from '@screens/builder';
import ProfileScreen from '@screens/profile';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';

import { APP_SCREEN } from './screen-types';

const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
  [APP_SCREEN.PROFILE]: {
    icon: ({ focused }) => (
      <Icon colorTheme={focused ? 'primary' : 'blue'} icon={'profile'} />
    ),
  },
  [APP_SCREEN.BUILDER]: {
    icon: ({ focused }) => (
      <Icon colorTheme={focused ? 'primary' : 'blue'} icon={'file_transfer'} />
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
          headerShown: false,
          tabBarLabel: 'Builder',
          title: 'Builder',
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
