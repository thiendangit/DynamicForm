import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import DatePicker from 'react-native-ui-datepicker';
import { useStyles } from 'react-native-unistyles';

import { Text } from '@rn-core';
import dayjs from 'dayjs';

import { datePickModalStyles } from './date-pick-modal.styles';

interface DatePickerModalProps {
  visible: boolean;
  value?: string | Date;
  onChange: (date: string) => void;
  onClose: () => void;
}

export const DatePickerModal = ({
  visible,
  value,
  onChange,
  onClose,
}: DatePickerModalProps) => {
  const { styles, theme } = useStyles(datePickModalStyles);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <DatePicker
            date={value ? dayjs(value).toDate() : new Date()}
            onChange={({ date }) => {
              if (date && date instanceof Date && !isNaN(date.getTime())) {
                onChange(dayjs(date).format('YYYY-MM-DD'));
              }

              onClose();
            }}
            mode="single"
            locale="en"
            calendar="gregory"
            maxDate={new Date()}
            style={{ borderRadius: 8 }}
            styles={{
              disabled_label: {
                color: theme.color.neutral200,
              },
              selected: {
                backgroundColor: theme.color.primary,
                borderRadius: 8,
              },
              selected_label: { color: theme.color.background },
              today: {
                borderColor: theme.color.secondary,
                borderRadius: 8,
                borderWidth: 2,
              },
            }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
