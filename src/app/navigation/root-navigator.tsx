import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useStyles } from 'react-native-unistyles';

import { APP_SCREEN } from '@navigation/screen-types';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectAppToken } from '@selectors/app';
import { useAppStore } from '@stores/app';

import { navigationRef } from './navigation-service';
import { TabNavigator } from './tab-navigator';

const useAppLoggedIn = () => {
  return useAppStore(selectAppToken) !== undefined;
};

const useAppLoggedOut = () => {
  return !useAppLoggedIn();
};

const RootStack = createNativeStackNavigator({
  screens: {
    [APP_SCREEN.BOTTOM_TAB]: TabNavigator,
  },
  screenOptions: {
    headerShown: false,
    freezeOnBlur: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export const RootNavigation = () => {
  // state

  const { theme } = useStyles();

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <Navigation
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.background,
        },
      }}
    />
  );
};
