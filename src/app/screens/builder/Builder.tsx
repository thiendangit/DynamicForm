import React, { useState } from 'react';
import { Switch, TouchableOpacity } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useStyles } from 'react-native-unistyles';

import { Modal } from '@components/modal';
import { Screen } from '@components/screen';
import { Tabs } from '@components/tabs';
import { Text, View } from '@rn-core';

import { builderStyles } from './Builder.styles';
import { useBuilderViewModel } from './Builder.viewModel';
import { AddCategoryModal } from './components/AddCategoryModal';
import { ConfirmDeleteTabModal } from './components/ConfirmDeleteTabModal';
import SectionList from './components/SectionList';

export default function BuilderScreen() {
  const [sectionToDelete, setSectionToDelete] = useState<number | null>(null);

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
      tabToDelete,
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
      setTabToDelete,
    },
    form,
  } = useBuilderViewModel();

  const tabType = tabs[activeTab]?.type || 'positions';

  const { styles, theme } = useStyles(builderStyles);

  // Hàm xác nhận xóa tab
  const confirmRemoveTab = () => {
    if (tabToDelete !== null) {
      handleRemoveTab(tabToDelete);

      setTabToDelete(null);
    }
  };

  // Xác nhận xóa section
  const confirmRemoveSection = () => {
    if (sectionToDelete !== null) {
      handleRemoveSection(sectionToDelete);

      setSectionToDelete(null);
    }
  };

  return (
    <Screen statusColor="transparent" statusBarStyle="dark" scroll={false}>
      <View style={styles.topRow}>
        <Text style={styles.autoSaveText}>Auto save when change tab</Text>
        <Switch
          value={autoSave}
          onValueChange={setAutoSave}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
        />
      </View>
      <ScrollView>
        <Tabs
          tabs={tabs}
          initialIndex={activeTab}
          onTabChange={handleTabChange}
          onAddTab={handleAddTab}
          onRemoveTab={setTabToDelete}
        />
        <SectionList
          key={activeTab}
          form={form}
          sections={formSections}
          onAddSection={handleAddSection}
          onRemoveSection={handleRemoveSection}
          errors={errors?.tabs?.[activeTab] || {}}
          tabType={tabType}
          tabName={formTabName}
          onChangeTabName={handleChangeTabName}
          activeTab={activeTab}
          setTabToDelete={setTabToDelete}
          setSectionToDelete={setSectionToDelete}
        />
        <View style={styles.saveBtnWrapper}>
          <TouchableOpacity
            style={[styles.saveBtn, { opacity: isSubmitting ? 0.6 : 1 }]}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomSpacer, { height }]} />
      </ScrollView>
      <Modal isVisible={showAddCategory} onBackdropPress={handleCancelAddTab}>
        <AddCategoryModal
          onSubmit={handleSubmitAddTab}
          onCancel={handleCancelAddTab}
        />
      </Modal>
      <ConfirmDeleteTabModal
        visible={tabToDelete !== null}
        onConfirm={confirmRemoveTab}
        onCancel={() => setTabToDelete(null)}
        theme={theme}
      />
      <ConfirmDeleteTabModal
        visible={sectionToDelete !== null}
        onConfirm={confirmRemoveSection}
        onCancel={() => setSectionToDelete(null)}
        theme={theme}
      />
    </Screen>
  );
}
