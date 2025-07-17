import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Modal } from '@components/modal';
import { Text } from '@rn-core';

interface ConfirmDeleteTabModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  theme: any;
}

export const ConfirmDeleteTabModal = ({
  visible,
  onConfirm,
  onCancel,
  theme,
}: ConfirmDeleteTabModalProps) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onCancel}>
      <View
        style={[styles.wrapper, { backgroundColor: theme.color.background }]}>
        <Text style={[styles.title, { color: theme.color.textPrimary }]}>
          Are you sure you want to delete this tab?
        </Text>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[
              styles.confirmBtn,
              { backgroundColor: theme.color.primary },
            ]}
            onPress={onConfirm}>
            <Text
              style={[styles.confirmBtnText, { color: theme.color.onPrimary }]}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cancelBtn,
              { backgroundColor: theme.color.inputBackground },
            ]}
            onPress={onCancel}>
            <Text
              style={[
                styles.cancelBtnText,
                { color: theme.color.textSecondary },
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
  },
  cancelBtn: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  cancelBtnText: {
    fontWeight: 'bold',
  },
  confirmBtn: {
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  confirmBtnText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  wrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    padding: 24,
    width: '80%',
  },
});

export default ConfirmDeleteTabModal;
