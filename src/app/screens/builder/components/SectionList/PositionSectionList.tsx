import React from 'react';
import { Modal, TextInput, TouchableOpacity } from 'react-native';

import { UseFormReturn } from 'react-hook-form';
import DatePicker from 'react-native-ui-datepicker';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { positionSectionListStyles } from './PositionSectionList.styles';

import { BuilderForm, TabError } from '@model/builder.types';
import { Text, View } from '@rn-core';
import dayjs from 'dayjs';

interface Props {
  form: UseFormReturn<BuilderForm>;
  errors: TabError;
}

export default function PositionSectionList({ form, errors }: Props) {
  const { styles } = useStyles(positionSectionListStyles);

  const [showDate, setShowDate] = React.useState(false);

  const startDateValue = form.watch('tabs.0.sections.2.value');

  const handleDateChange = (date: unknown) => {
    setShowDate(false);

    if (date && date instanceof Date && !isNaN(date.getTime())) {
      form.setValue(
        'tabs.0.sections.2.value',
        dayjs(date).format('YYYY-MM-DD'),
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Positions</Text>
      {/* Position Title */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Position Title</Text>
        <TextInput
          value={String(form.watch('tabs.0.sections.0.value') || '')}
          onChangeText={val => form.setValue('tabs.0.sections.0.value', val)}
          placeholder="Enter position title"
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        {errors?.sections?.[0]?.value && (
          <Text style={styles.errorText}>
            {errors.sections[0].value.message}
          </Text>
        )}
      </View>
      {/* Company Name */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Company Name</Text>
        <TextInput
          value={String(form.watch('tabs.0.sections.1.value') || '')}
          onChangeText={val => form.setValue('tabs.0.sections.1.value', val)}
          placeholder="Enter company name"
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        {errors?.sections?.[1]?.value && (
          <Text style={styles.errorText}>
            {errors.sections[1].value.message}
          </Text>
        )}
      </View>
      {/* Start Date */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Start Date</Text>
        <TouchableOpacity onPress={() => setShowDate(true)}>
          <TextInput
            value={String(startDateValue || '')}
            placeholder="YYYY-MM-DD"
            editable={false}
            style={[styles.input, { backgroundColor: '#f7f7f7' }]}
            placeholderTextColor="#B0B0B0"
            pointerEvents='none'
          />
        </TouchableOpacity>
        <Modal
          visible={showDate}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDate(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DatePicker
                date={
                  startDateValue ? dayjs(startDateValue).toDate() : new Date()
                }
                onChange={({ date }) => handleDateChange(date)}
                mode="single"
                locale="en"
                calendar="gregory"
                maxDate={new Date()}
                style={{ borderRadius: 8 }}
              />
              <TouchableOpacity
                onPress={() => setShowDate(false)}
                style={styles.modalCloseBtn}>
                <Text style={styles.primaryText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {errors?.sections?.[2]?.value && (
          <Text style={styles.errorText}>
            {errors.sections[2].value.message}
          </Text>
        )}
      </View>
    </View>
  );
}
