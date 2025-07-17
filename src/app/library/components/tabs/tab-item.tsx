import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TabItemProps } from './type';

interface CustomTabItemProps extends TabItemProps {
  onPress?: () => void;
  onRemove?: () => void;
  isAdd?: boolean;
  selectedIndex: number;
}

export const TabItem = React.forwardRef<View, CustomTabItemProps>(
  ({ tab, index, selectedIndex, onPress, onRemove, isAdd }, ref) => {
    const isActive = selectedIndex === index;

    if (isAdd) {
      return (
        <View ref={ref}>
          <TouchableOpacity style={styles.addTab} onPress={onPress}>
            <Text style={styles.addTabText}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View ref={ref}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.tab,
            isActive ? styles.tabActive : styles.tabInactive,
            styles.tabWrapper,
          ]}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.tabText,
              isActive ? styles.tabTextActive : styles.tabTextInactive,
            ]}>
            {tab.title}
          </Text>
          {onRemove && (
            <TouchableOpacity
              onPress={onRemove}
              style={styles.removeBtn}
              hitSlop={{ bottom: 8, left: 8, right: 8, top: 8 }}>
              <Text style={styles.removeBtnText}>×</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  addTab: {
    alignItems: 'center',
    backgroundColor: '#DDDEE0FF',
    borderRadius: 10,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  addTabText: {
    color: '#374151',
    fontSize: 22,
    marginTop: -2,
  },
  removeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    padding: 0,
  },
  removeBtnText: {
    color: '#BC305D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
  tab: {
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: '#4F46E5',
  },
  tabInactive: {
    backgroundColor: '#DDDEE0FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: '#374151',
  },
  tabWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
