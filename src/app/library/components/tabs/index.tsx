import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { TabItem } from './tab-item';
import { TabsProps } from './type';

interface CustomTabsProps extends TabsProps {
  onTabChange?: (index: number) => void;
  onAddTab?: () => void;
  onRemoveTab?: (index: number) => void;
}

export const Tabs = ({
  tabs,
  initialIndex = 0,
  onTabChange,
  onAddTab,
  onRemoveTab,
}: CustomTabsProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);

  const scrollRef = useRef<ScrollView>(null);

  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>(
    [],
  );

  const [prevTabsLength, setPrevTabsLength] = useState(tabs.length);

  useEffect(() => {
    if (tabs.length > prevTabsLength) {
      setSelectedIndex(tabs.length - 1);
      onTabChange?.(tabs.length - 1);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
    setPrevTabsLength(tabs.length);
  }, [tabs.length]);

  const handleTabLayout = (index: number, event: any) => {
    const { x, width } = event.nativeEvent.layout;

    setTabLayouts(prev => {
      const next = [...prev];

      next[index] = { width, x };

      return next;
    });
  };

  const scrollToTab = (index: number) => {
    if (tabLayouts[index]) {
      const { x } = tabLayouts[index];

      scrollRef.current?.scrollTo({ animated: true, x: Math.max(x - 40, 0) });
    }
  };

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);

    onTabChange?.(index);

    setTimeout(() => scrollToTab(index), 0);
  };

  const handleAddTab = () => {
    onAddTab?.();
    // Không setSelectedIndex ở đây nữa
  };

  const handleRemoveTab = (index: number) => {
    onRemoveTab?.(index);

    if (selectedIndex === index) {
      setSelectedIndex(0);
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      bounces={false}>
      {tabs.map((tab, idx) => (
        <View key={tab.key} onLayout={e => handleTabLayout(idx, e)}>
          <TabItem
            tab={tab}
            index={idx}
            selectedIndex={selectedIndex}
            onPress={() => handleTabPress(idx)}
            onRemove={
              tab.key !== 'positions' ? () => handleRemoveTab(idx) : undefined
            }
          />
        </View>
      ))}
      {onAddTab && (
        <View style={styles.addTabWrapper}>
          <TabItem
            tab={{ key: 'add', title: '+' }}
            index={tabs.length}
            selectedIndex={selectedIndex}
            onPress={handleAddTab}
            isAdd
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addTabWrapper: {},
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
  },
});
