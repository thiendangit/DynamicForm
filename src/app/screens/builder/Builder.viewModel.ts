import { useCallback, useEffect, useState } from 'react';

import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';

import { showSnack } from '@components/snack-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BuilderForm,
  BuilderFormErrors,
  builderSchema,
  CategoryTab,
  Section,
  Tab,
} from '@model/builder.types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { load, save } from '@storage';

const STORAGE_KEY = 'builder_data_v1';

type UseBuilderViewModelReturn = {
  selectors: {
    tabs: CategoryTab[];
    activeTab: number;
    activeTabKey: string;
    showAddCategory: boolean;
    isSubmitting: boolean;
    formSections: Section[];
    formTabName: string;
    errors: BuilderFormErrors;
    height: number;
    autoSave: boolean;
    tabToDelete: number | null;
    sectionToDelete: number | null;
  };
  handlers: {
    handleTabChange: (index: number) => void;
    handleAddTab: () => void;
    handleRemoveTab: (index: number) => void;
    handleSubmitAddTab: (data: { title: string }) => void;
    handleCancelAddTab: () => void;
    handleAddSection: () => void;
    handleRemoveSection: (idx: number) => void;
    handleChangeTabName: (val: string) => void;
    handleSubmit: () => void;
    setActiveTab: (idx: number) => void;
    setAutoSave: (value: boolean) => void;
    setTabToDelete: (index: number | null) => void;
    setSectionToDelete: (index: number | null) => void;
  };
  form: UseFormReturn<BuilderForm>;
};

export const useBuilderViewModel = (): UseBuilderViewModelReturn => {
  const [tabs, setTabs] = useState<CategoryTab[]>([
    { key: 'positions', title: 'Positions', type: 'positions' },
  ]);

  const [tabToDelete, setTabToDelete] = useState<number | null>(null);
  const [sectionToDelete, setSectionToDelete] = useState<number | null>(null);

  const height = useBottomTabBarHeight();

  const [activeTab, setActiveTab] = useState(0);

  const [showAddCategory, setShowAddCategory] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [autoSave, setAutoSave] = useState(true);

  // React Hook Form
  const form = useForm<BuilderForm>({
    defaultValues: {
      tabs: [
        {
          key: 'positions',
          sections: [
            { title: 'Position Title', value: '' },
            { title: 'Company Name', value: '' },
            { title: 'Start Date', value: '' },
          ],
          title: 'Positions',
          type: 'positions',
        },
      ],
    },
    mode: 'onChange',
    resolver: zodResolver(builderSchema),
  });

  // Field array for sections of current tab
  const { append, remove } = useFieldArray({
    control: form.control,
    name: `tabs.${activeTab}.sections` as const,
  });

  const formSections: Section[] =
    useWatch({
      control: form.control,
      name: `tabs.${activeTab}.sections` as const,
    }) || [];

  const tabList = tabs.map(t => ({
    key: t.key,
    title: t.title,
    type: t.type,
  }));

  // Tab name for custom tab
  const formTabName: string =
    form.watch(`tabs.${activeTab}.tabName` as const) || '';

  // Load from local storage
  useEffect(() => {
    (async () => {
      try {
        const data = load(STORAGE_KEY);

        if (data && Array.isArray(data.tabs)) {
          const fixedTabs: Tab[] = data.tabs.map((tab: Tab) => {
            const name = tab.tabName || tab.title || '';

            return {
              ...tab,
              sections: (tab.sections || []).map((section: Section) => ({
                ...section,
                type: section.type || 'text',
              })) as Section[],
              tabName: name,
              title: name,
            };
          });

          setTabs(
            fixedTabs.map(t => ({
              key: t.key,
              title: t.title,
              type: t.type,
            })),
          );

          form.reset({ ...data, tabs: fixedTabs });
        }
      } catch { }
    })();
  }, [form]);

  // Add tab
  const handleAddTab = () => setShowAddCategory(true);

  const handleCancelAddTab = () => setShowAddCategory(false);

  const handleSubmitAddTab = (data: { title: string }) => {
    const existed = tabs.some(tab => tab.title.trim().toLowerCase() === data.title.trim().toLowerCase());
    if (existed) {
      showSnack({ msg: 'Tab name already exists!', type: 'error' });
      return;
    }
    const key = data.title.toLowerCase().replace(/\s/g, '_');
    const newTab: CategoryTab = { key, title: data.title, type: 'custom' };
    setTabs([...tabs, newTab]);
    form.setValue(`tabs.${tabs.length}` as const, {
      key,
      sections: [],
      tabName: data.title,
      title: data.title,
      type: 'custom',
    });
    form.resetField(`tabs.${tabs.length}.sections`);
    setTimeout(() => {
      setActiveTab(tabs.length);
    }, 0);
    setShowAddCategory(false);
  };

  const handleRemoveTab = (index: number) => {
    if (tabs[index].type === 'positions') {
      return;
    }

    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);

    form.unregister(`tabs.${index}` as const);
    const newFormTabs = form.getValues('tabs').filter((_, i) => i !== index) as Tab[];
    form.setValue('tabs', newFormTabs);

    setActiveTab(prev => {
      if (prev > index) return prev - 1;
      if (prev === index) return Math.max(0, prev - 1);
      return prev;
    });

    save(STORAGE_KEY, { ...form.getValues(), tabs: newFormTabs });
  };

  const autoSaveTab = async (tabIndex: number) => {
    const allTabs = form.getValues('tabs');

    const tabData = allTabs[tabIndex] as Tab;

    try {
      const old = load(STORAGE_KEY) || {};

      const newTabs = old.tabs ? [...old.tabs] : [];

      newTabs[tabIndex] = tabData;

      save(STORAGE_KEY, { ...old, tabs: newTabs });
    } catch (e) {
      // tracking here
    }
  };

  // Tab change
  const handleTabChange = async (index: number) => {
    if (autoSave) {
      await autoSaveTab(activeTab);
    }

    setActiveTab(index);
  };

  // Add section
  const handleAddSection = () => {
    append({ title: '', type: 'text', value: '' });
  };

  // Remove section
  const handleRemoveSection = (idx: number) => {
    remove(idx);
  };

  const handleChangeTabName = (val: string) => {
    form.setValue(`tabs.${activeTab}.tabName` as const, val);

    form.setValue(`tabs.${activeTab}.title` as const, val);

    setTabs(tabs.map((t, i) => (i === activeTab ? { ...t, title: val } : t)));
  };

  // Submit
  const handleSubmit = useCallback(
    form.handleSubmit(async (data: BuilderForm) => {
      setIsSubmitting(true);

      console.log('data', data);

      try {
        const fixedTabs: Tab[] = data.tabs.map(tab => ({
          ...tab,
          sections: (tab.sections || []).map(section => ({
            ...section,
            type: section.type || 'text',
          })) as Section[],
        }));

        save(STORAGE_KEY, { ...data, tabs: fixedTabs });

        showSnack({ msg: 'Saved successfully!', type: 'success' });
      } finally {
        setIsSubmitting(false);
      }
    }),
    [form],
  );

  return {
    form,
    handlers: {
      handleAddSection,
      handleAddTab,
      handleCancelAddTab,
      handleChangeTabName,
      handleRemoveSection,
      handleRemoveTab,
      handleSubmit,
      handleSubmitAddTab,
      handleTabChange,
      setActiveTab,
      setAutoSave,
      setTabToDelete,
      setSectionToDelete,
    },
    selectors: {
      activeTab,
      activeTabKey: tabs[activeTab]?.key,
      autoSave,
      errors: form.formState.errors as BuilderFormErrors,
      formSections,
      formTabName,
      height,
      isSubmitting,
      showAddCategory,
      tabs: tabList,
      tabToDelete,
      sectionToDelete,
    },
  };
};
