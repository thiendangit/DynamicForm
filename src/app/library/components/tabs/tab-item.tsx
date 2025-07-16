import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TabItemProps, Tab } from './type';

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
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
            {tab.title}
          </Text>
          {onRemove && (
            <TouchableOpacity onPress={onRemove} style={styles.removeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.removeBtnText}>×</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabActive: {
    backgroundColor: '#4F46E5',
  },
  tabInactive: {
    backgroundColor: '#DDDEE0FF',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: '#374151',
  },
  addTab: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DDDEE0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTabText: {
    color: '#374151',
    fontSize: 22,
    marginTop: -2,
  },
  removeBtn: {
    marginLeft: 8,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: '#BC305D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
