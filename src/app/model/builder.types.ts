// Các type cho builder, section, tab, form, errors
import { z } from 'zod';

export type CategoryTab = {
    key: string;
    title: string;
    type: 'positions' | 'custom';
};

export const sectionSchema = z.object({
    title: z.string().min(1, 'Section title is required'),
    type: z.enum(['date', 'text']).optional(),
    value: z.union([z.string(), z.date().optional()]),
    _showDate: z.boolean().optional(), // Thêm field này để type-safe cho UI
});
export type Section = z.infer<typeof sectionSchema>;

export const tabSchema = z.object({
    key: z.string(),
    sections: z.array(sectionSchema),
    tabName: z.string().optional(),
    title: z.string(),
    type: z.enum(['positions', 'custom']),
});
export type Tab = z.infer<typeof tabSchema>;

export const builderSchema = z.object({
    tabs: z.array(tabSchema),
});
export type BuilderForm = z.infer<typeof builderSchema>;

// Type cho errors (dạng react-hook-form)
export type SectionError = {
    title?: { message?: string };
    value?: { message?: string };
};
export type TabError = {
    tabName?: { message?: string };
    sections?: SectionError[];
};
export type BuilderFormErrors = {
    tabs?: TabError[];
}; 