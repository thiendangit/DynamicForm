import React from 'react';

import { UseFormReturn } from 'react-hook-form';

import { BuilderForm, Section, TabError } from '@model/builder.types';

import CustomSectionList from './CustomSectionList';
import PositionSectionList from './PositionSectionList';

export interface SectionListProps {
  form: UseFormReturn<BuilderForm>;
  sections: Section[];
  onAddSection: () => void;
  onRemoveSection: (idx: number) => void;
  errors: TabError;
  tabType: 'positions' | 'custom';
  tabName: string;
  onChangeTabName: (val: string) => void;
  activeTab: number;
}

export default function SectionList(props: SectionListProps) {
  if (props.tabType === 'positions') {
    return <PositionSectionList {...props} />;
  }

  return <CustomSectionList {...props} />;
}
