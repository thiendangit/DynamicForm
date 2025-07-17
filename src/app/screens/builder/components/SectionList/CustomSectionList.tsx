import React from 'react';
import { Switch, TextInput, TouchableOpacity } from 'react-native';

import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import { DatePickerModal } from '@components/date-picker-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BuilderForm, Section, TabError } from '@model/builder.types';
import { Text, View } from '@rn-core';
import dayjs from 'dayjs';

import { customSectionListStyles } from './CustomSectionList.styles';

interface Props {
  form: UseFormReturn<BuilderForm>;
  sections: Section[];
  onAddSection: () => void;
  errors: TabError;
  tabName: string;
  onChangeTabName: (val: string) => void;
  activeTab: number;
  setTabToDelete: (idx: number) => void;
  setSectionToDelete: (idx: number) => void;
  sectionToDelete: number | null;
}

export default function CustomSectionList({
  form,
  errors,
  tabName,
  onChangeTabName,
  activeTab,
  setSectionToDelete,
  sectionToDelete,
}: Props) {
  const { styles } = useStyles(customSectionListStyles);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `tabs.${activeTab}.sections`,
  });

  const [sectionDateModalIdx, setSectionDateModalIdx] = React.useState<
    number | null
  >(null);

  const handleOpenDateModal = (idx: number) => setSectionDateModalIdx(idx);

  const handleCloseDateModal = () => setSectionDateModalIdx(null);

  // Hàm xác nhận xóa section
  const [pendingRemoveIdx, setPendingRemoveIdx] = React.useState<number | null>(
    null,
  );

  const handleRemoveSection = (idx: number) => {
    setPendingRemoveIdx(idx);

    setSectionToDelete(idx);
  };

  React.useEffect(() => {
    if (pendingRemoveIdx === null) {
      return;
    }

    if (sectionToDelete === null) {
      remove(pendingRemoveIdx);

      setPendingRemoveIdx(null);
    }
  }, [pendingRemoveIdx, remove, sectionToDelete]);

  return (
    <View style={styles.wrapper}>
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.sectionTitle}>Tab Name</Text>
        <TextInput
          value={tabName}
          onChangeText={onChangeTabName}
          placeholder="Enter tab name"
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        {errors?.tabName && (
          <Text style={styles.errorText}>{errors.tabName.message}</Text>
        )}
      </View>
      <Text style={styles.sectionTitle}>Sections</Text>
      {fields.map((field, idx) => {
        const type = field.type || 'text';

        const isDate = type === 'date';

        const handleToggleType = (val: boolean) => {
          const _sections = form.getValues(`tabs.${activeTab}.sections`) || [];

          const newSections = _sections.map((s, i: number) =>
            i === idx
              ? {
                  ...s,
                  type: val ? 'date' : 'text',
                  value: val ? dayjs().format('YYYY-MM-DD') : '',
                }
              : s,
          );

          form.setValue(
            `tabs.${activeTab}.sections`,
            newSections as typeof _sections,
            {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            },
          );
        };

        return (
          <View key={field.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHeader}>Section {idx + 1}</Text>
              <View style={styles.switchRow}>
                <MaterialCommunityIcons
                  name={isDate ? 'calendar-month-outline' : 'pencil-outline'}
                  size={18}
                  color={isDate ? '#4F46E5' : '#374151'}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[styles.switchLabel, !isDate && { color: '#374151' }]}>
                  Text
                </Text>
                <Switch
                  value={isDate}
                  onValueChange={handleToggleType}
                  trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                  thumbColor={isDate ? '#fff' : '#fff'}
                />
                <Text
                  style={[styles.switchLabel, isDate && { color: '#4F46E5' }]}>
                  Date
                </Text>
              </View>
            </View>
            {/* Sử dụng Controller cho Section Title */}
            <Controller
              control={form.control}
              name={`tabs.${activeTab}.sections.${idx}.title`}
              render={data => (
                <TextInput
                  value={data.field.value}
                  onChangeText={data.field.onChange}
                  placeholder="Section Title"
                  style={styles.input}
                  placeholderTextColor="#B0B0B0"
                />
              )}
            />
            {errors?.sections?.[idx]?.title && (
              <Text style={styles.errorText}>
                {errors.sections[idx].title.message}
              </Text>
            )}
            {isDate ? (
              <>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 12,
                  }}
                  onPress={() => handleOpenDateModal(idx)}
                  activeOpacity={0.8}>
                  <TextInput
                    value={String(
                      form.watch(`tabs.${activeTab}.sections.${idx}.value`) ||
                        field.value ||
                        '',
                    )}
                    placeholder="YYYY-MM-DD"
                    editable={false}
                    style={[
                      styles.input,
                      { backgroundColor: '#f7f7f7', flex: 1, paddingRight: 38 },
                    ]}
                    placeholderTextColor="#B0B0B0"
                    pointerEvents="none"
                  />
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={22}
                    color="#4F46E5"
                    style={{ position: 'absolute', right: 12 }}
                  />
                </TouchableOpacity>
                <DatePickerModal
                  visible={sectionDateModalIdx === idx}
                  value={
                    form.watch(`tabs.${activeTab}.sections.${idx}.value`) || ''
                  }
                  onChange={date =>
                    form.setValue(
                      `tabs.${activeTab}.sections.${idx}.value`,
                      date,
                      { shouldDirty: true },
                    )
                  }
                  onClose={handleCloseDateModal}
                />
              </>
            ) : (
              <TextInput
                value={String(
                  form.watch(`tabs.${activeTab}.sections.${idx}.value`) || '',
                )}
                onChangeText={(val: string) =>
                  form.setValue(
                    `tabs.${activeTab}.sections.${idx}.value`,
                    val,
                    { shouldDirty: true },
                  )
                }
                placeholder="Section Value"
                style={[styles.input, { marginTop: 12 }]}
                placeholderTextColor="#B0B0B0"
              />
            )}
            {errors?.sections?.[idx]?.value && (
              <Text style={styles.errorText}>
                {errors.sections[idx].value.message}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => handleRemoveSection(idx)}
              style={styles.removeBtn}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={18}
                color="#BC305D"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.removeBtnText}>Remove Section</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => append({ title: '', type: 'text', value: '' })}
        style={styles.addSectionBtn}>
        <MaterialCommunityIcons
          name="plus"
          size={20}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.addSectionBtnText}>Add Section</Text>
      </TouchableOpacity>
    </View>
  );
}
