import React from 'react';

import { useSharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { View } from '@rn-core';

import { TabItem } from './tab-item';
import { Tab, TabsProps } from './type';

export const Tabs = ({ tabs, initialIndex = 0 }: TabsProps) => {
  // state
  const { styles } = useStyles(styleSheet);

  const selectedIndex = useSharedValue(initialIndex);

  // func
  const renderTab = (item: Tab, index: number) => {
    return (
      <TabItem
        index={index}
        selectedIndex={selectedIndex}
        tab={item}
        key={item.key}
      />
    );
  };

  // render
  return <View style={styles.container}>{tabs.map(renderTab)}</View>;
};

const styleSheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.color.neutral50,
    flexDirection: 'row',
  },
}));
