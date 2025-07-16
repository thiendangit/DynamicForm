import React from 'react';
import { Modal, Switch, TextInput, TouchableOpacity } from 'react-native';

import DatePicker from 'react-native-ui-datepicker';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@rn-core';
import dayjs from 'dayjs';

interface Props {
  form: any;
  sections: any[];
  onAddSection: () => void;
  onRemoveSection: (idx: number) => void;
  errors: any;
  tabName: string;
  onChangeTabName: (val: string) => void;
  activeTab: number;
}

export default function CustomSectionList({
  form,
  sections,
  onAddSection,
  onRemoveSection,
  errors,
  tabName,
  onChangeTabName,
  activeTab,
}: Props) {
  const { styles } = useStyles(styleSheet);

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
      {sections.map((section, idx) => {
        const type = section.type || 'text';

        const isDate = type === 'date';

        // Xử lý switch đổi type
        const handleToggleType = (val: boolean) => {
          const sections = form.getValues(`tabs.${activeTab}.sections`) || [];

          const newSections = sections.map((s: any, i: number) =>
            i === idx
              ? {
                  ...s,
                  type: val ? 'date' : 'text',
                  value: val ? dayjs().format('YYYY-MM-DD') : '',
                }
              : s,
          );

          form.setValue(`tabs.${activeTab}.sections`, newSections, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        };

        return (
          <View key={section.id || idx} style={styles.card}>
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
                  style={[styles.switchLabel, isDate && { color: '#4F46E5' }]}>
                  Date
                </Text>
                <Switch
                  value={isDate}
                  onValueChange={handleToggleType}
                  trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
                  thumbColor={isDate ? '#fff' : '#fff'}
                />
                <Text
                  style={[styles.switchLabel, !isDate && { color: '#374151' }]}>
                  Text
                </Text>
              </View>
            </View>
            <TextInput
              value={
                form.watch(`tabs.${activeTab}.sections.${idx}.title`) ||
                section.title
              }
              onChangeText={(val: string) =>
                form.setValue(`tabs.${activeTab}.sections.${idx}.title`, val, {
                  shouldDirty: true,
                })
              }
              placeholder="Section Title"
              style={styles.input}
              placeholderTextColor="#B0B0B0"
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
                  onPress={() =>
                    form.setValue(
                      `tabs.${activeTab}.sections.${idx}._showDate`,
                      true,
                      { shouldDirty: true },
                    )
                  }
                  activeOpacity={0.8}>
                  <TextInput
                    value={form.watch(
                      `tabs.${activeTab}.sections.${idx}.value`,
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
                <Modal
                  visible={
                    !!form.watch(`tabs.${activeTab}.sections.${idx}._showDate`)
                  }
                  transparent
                  animationType="fade"
                  onRequestClose={() =>
                    form.setValue(
                      `tabs.${activeTab}.sections.${idx}._showDate`,
                      false,
                      { shouldDirty: true },
                    )
                  }>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <DatePicker
                        date={
                          form.watch(`tabs.${activeTab}.sections.${idx}.value`)
                            ? dayjs(
                                form.watch(
                                  `tabs.${activeTab}.sections.${idx}.value`,
                                ),
                              ).toDate()
                            : new Date()
                        }
                        onChange={({ date }) => {
                          if (
                            date &&
                            date instanceof Date &&
                            !isNaN(date.getTime())
                          ) {
                            form.setValue(
                              `tabs.${activeTab}.sections.${idx}.value`,
                              dayjs(date).format('YYYY-MM-DD'),
                              { shouldDirty: true },
                            );
                          }

                          form.setValue(
                            `tabs.${activeTab}.sections.${idx}._showDate`,
                            false,
                            { shouldDirty: true },
                          );
                        }}
                        mode="single"
                        locale="en"
                        calendar="gregory"
                        maxDate={new Date()}
                        style={{ borderRadius: 8 }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          form.setValue(
                            `tabs.${activeTab}.sections.${idx}._showDate`,
                            false,
                            { shouldDirty: true },
                          )
                        }
                        style={styles.modalCloseBtn}>
                        <Text style={styles.primaryText}>Đóng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <TextInput
                value={
                  form.watch(`tabs.${activeTab}.sections.${idx}.value`) ||
                  section.value
                }
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
              onPress={() => onRemoveSection(idx)}
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
      <TouchableOpacity onPress={onAddSection} style={styles.addSectionBtn}>
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

const styleSheet = createStyleSheet(() => ({
  addSectionBtn: {
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 8,
    paddingVertical: 12,
  },
  addSectionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    elevation: 2,
    marginBottom: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  cardHeader: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  errorText: {
    color: '#BC305D',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    padding: 12,
  },
  modalCancelBtn: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  modalCancelBtnText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    alignItems: 'center',
    marginTop: 12,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    elevation: 4,
    minWidth: 260,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    flex: 1,
    justifyContent: 'center',
  },
  modalPrimaryBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    marginBottom: 10,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  modalPrimaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  primaryText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: 'bold',
  },
  removeBtn: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#FFF0F3',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeBtnText: {
    color: '#BC305D',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',

    marginBottom: 12,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  typeBtn: {
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  wrapper: {
    padding: 16,
  },
}));
