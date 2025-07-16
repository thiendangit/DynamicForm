import React from 'react';
import { Switch, TouchableOpacity } from 'react-native';

import { Modal } from '@components/modal';
import { Screen } from '@components/screen';
import { Tabs } from '@components/tabs';
import { Text, View } from '@rn-core';

import { useBuilderViewModel } from './Builder.viewModel';
import { AddCategoryModal } from './components/AddCategoryModal';
import SectionList from './components/SectionList';

export default function BuilderScreen() {
  const {
    selectors: {
      tabs,
      activeTab,
      showAddCategory,
      formSections,
      isSubmitting,
      formTabName,
      errors,
      height,
      autoSave,
    },
    handlers: {
      handleTabChange,
      handleAddTab,
      handleSubmitAddTab,
      handleRemoveTab,
      handleCancelAddTab,
      handleAddSection,
      handleRemoveSection,
      handleChangeTabName,
      handleSubmit,
      setAutoSave,
    },
    form,
  } = useBuilderViewModel();

  const tabType = tabs[activeTab]?.type || 'positions';

  return (
    <Screen statusColor="transparent" statusBarStyle="dark" scroll>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 8,
        }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          Auto save when change tab
        </Text>
        <Switch
          value={autoSave}
          onValueChange={setAutoSave}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
        />
      </View>
      <Tabs
        tabs={tabs}
        initialIndex={activeTab}
        onTabChange={handleTabChange}
        onAddTab={handleAddTab}
        onRemoveTab={handleRemoveTab}
      />
      <SectionList
        form={form}
        sections={formSections}
        onAddSection={handleAddSection}
        onRemoveSection={handleRemoveSection}
        errors={errors?.tabs?.[activeTab] || {}}
        tabType={tabType}
        tabName={formTabName}
        onChangeTabName={handleChangeTabName}
        activeTab={activeTab}
      />
      <Modal isVisible={showAddCategory} onBackdropPress={handleCancelAddTab}>
        <AddCategoryModal
          onSubmit={handleSubmitAddTab}
          onCancel={handleCancelAddTab}
        />
      </Modal>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#BC305D',
            borderRadius: 8,
            opacity: isSubmitting ? 0.6 : 1,
            padding: 16,
          }}
          onPress={handleSubmit}
          disabled={isSubmitting}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Lưu dữ liệu
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: height }} />
    </Screen>
  );
}
