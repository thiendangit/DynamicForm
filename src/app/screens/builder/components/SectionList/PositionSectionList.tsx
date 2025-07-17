import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import { UseFormReturn } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import { DatePickerModal } from '@components/date-picker-modal';
import { BuilderForm, TabError } from '@model/builder.types';
import { Text, View } from '@rn-core';

import { positionSectionListStyles } from './PositionSectionList.styles';

interface Props {
  form: UseFormReturn<BuilderForm>;
  errors: TabError;
}

export default function PositionSectionList({ form, errors }: Props) {
  const { styles } = useStyles(positionSectionListStyles);

  const [showDate, setShowDate] = React.useState(false);

  const startDateValue = form.watch('tabs.0.sections.2.value');

  const handleDateChange = (date: unknown) => {
    if (typeof date === 'string') {
      form.setValue('tabs.0.sections.2.value', date);
    }

    setShowDate(false);
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
            pointerEvents="none"
          />
        </TouchableOpacity>
        <DatePickerModal
          visible={showDate}
          value={startDateValue || ''}
          onChange={handleDateChange}
          onClose={() => setShowDate(false)}
        />
        {errors?.sections?.[2]?.value && (
          <Text style={styles.errorText}>
            {errors.sections[2].value.message}
          </Text>
        )}
      </View>
    </View>
  );
}
