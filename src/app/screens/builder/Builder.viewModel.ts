import { useCallback, useEffect, useState } from 'react';

import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { z } from 'zod';

import { load, save } from '../../library/utils/storage';

const STORAGE_KEY = 'builder_data_v1';

export type CategoryTab = {
    key: string;
    title: string;
    type: 'positions' | 'custom';
};

// Section schema
const sectionSchema = z.object({
    title: z.string().min(1, 'Section title is required'),
    type: z.enum(['date', 'text']).optional(),
    value: z.union([z.string(), z.date().optional()]),
});

// Tab schema
const tabSchema = z.object({
    key: z.string(),
    // for custom tab
    sections: z.array(sectionSchema),

    tabName: z.string().optional(),

    title: z.string(),
    type: z.enum(['positions', 'custom']),
});

// Form schema: array of tabs
const builderSchema = z.object({
    tabs: z.array(tabSchema),
});

type BuilderForm = z.infer<typeof builderSchema>;

type UseBuilderViewModelReturn = {
    selectors: {
        tabs: CategoryTab[];
        activeTab: number;
        activeTabKey: string;
        showAddCategory: boolean;
        isSubmitting: boolean;
        formSections: any[];
        formTabName: string;
        errors: any;
        height: number;
        autoSave: boolean;
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
    };
    form: ReturnType<typeof useForm<BuilderForm>>;
};

export const useBuilderViewModel = (): UseBuilderViewModelReturn => {
    // Tabs state
    const [tabs, setTabs] = useState<CategoryTab[]>([
        { key: 'positions', title: 'Positions', type: 'positions' },
    ]);

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
        name: `tabs.${activeTab}.sections`,
    });

    // Lấy sections luôn cập nhật từ react-hook-form
    const formSections =
        useWatch({
            control: form.control,
            name: `tabs.${activeTab}.sections`,
        }) || [];

    // Tab name for custom tab
    const formTabName = form.watch(`tabs.${activeTab}.tabName`) || '';

    // Load from local storage
    useEffect(() => {
        (async () => {
            try {
                const data = load(STORAGE_KEY);

                if (data && Array.isArray(data.tabs)) {
                    // Đảm bảo mỗi tab có title và tabName đồng bộ
                    const fixedTabs = data.tabs.map((tab: any) => {
                        const name = tab.tabName || tab.title || '';
                        return {
                            ...tab,
                            title: name,
                            tabName: name,
                            sections: (tab.sections || []).map((section: any) => ({
                                ...section,
                                type: section.type || 'text',
                            })),
                        };
                    });

                    setTabs(
                        fixedTabs.map((t: any) => ({
                            key: t.key,
                            title: t.title,
                            type: t.type,
                        })),
                    );

                    form.reset({ ...data, tabs: fixedTabs });
                }
            } catch { }
        })();
        // eslint-disable-next-line
    }, []);

    // Add tab
    const handleAddTab = () => setShowAddCategory(true);

    const handleCancelAddTab = () => setShowAddCategory(false);

    // Khi tạo tab mới, đồng bộ title và tabName
    const handleSubmitAddTab = (data: { title: string }) => {
        const key = data.title.toLowerCase().replace(/\s/g, '_');

        const newTab: CategoryTab = { key, title: data.title, type: 'custom' };

        setTabs([...tabs, newTab]);

        form.setValue(`tabs.${tabs.length}`, {
            key,
            sections: [],
            tabName: data.title,
            title: data.title,
            type: 'custom',
        });

        setActiveTab(tabs.length);

        setShowAddCategory(false);
    };

    // Remove tab
    const handleRemoveTab = (index: number) => {
        if (tabs[index].type === 'positions') {
            return;
        }

        const newTabs = tabs.filter((_, i) => i !== index);

        setTabs(newTabs);

        form.unregister(`tabs.${index}`);

        form.setValue(
            'tabs',
            form.getValues('tabs').filter((_, i) => i !== index),
        );

        setActiveTab(Math.max(0, activeTab - 1));
    };

    // Thêm auto save tab khi chuyển tab
    const autoSaveTab = async (tabIndex: number) => {
        const allTabs = form.getValues('tabs');
        const tabData = allTabs[tabIndex];
        try {
            tabSchema.parse(tabData); // validate tab
            const old = load(STORAGE_KEY) || {};
            let newTabs = old.tabs ? [...old.tabs] : [];
            newTabs[tabIndex] = tabData;
            save(STORAGE_KEY, { ...old, tabs: newTabs });
        } catch (e) {
            // Không lưu nếu không hợp lệ
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

    // Khi đổi tên tab, đồng bộ cả title và tabName
    const handleChangeTabName = (val: string) => {
        form.setValue(`tabs.${activeTab}.tabName`, val);
        form.setValue(`tabs.${activeTab}.title`, val);
        setTabs(tabs.map((t, i) => (i === activeTab ? { ...t, title: val } : t)));
    };

    // Submit
    const handleSubmit = useCallback(
        form.handleSubmit(async data => {
            setIsSubmitting(true);

            try {
                // Đảm bảo mỗi section đều có type trước khi lưu
                const fixedTabs = data.tabs.map((tab: any) => ({
                    ...tab,
                    sections: (tab.sections || []).map((section: any) => ({
                        ...section,
                        type: section.type || 'text',
                    })),
                }));

                save(STORAGE_KEY, { ...data, tabs: fixedTabs });
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
            setAutoSave, // truyền ra ngoài
        },
        selectors: {
            activeTab,
            activeTabKey: tabs[activeTab]?.key,
            errors: form.formState.errors,
            formSections,
            formTabName,
            height,
            isSubmitting,
            showAddCategory,
            tabs,
            autoSave, // truyền ra ngoài
        },
    };
};
