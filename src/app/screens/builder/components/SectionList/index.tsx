import React from 'react';

import CustomSectionList from './CustomSectionList';
import PositionSectionList from './PositionSectionList';

interface SectionListProps {
    form: any;
    sections: any[];
    onAddSection: () => void;
    onRemoveSection: (idx: number) => void;
    errors: any;
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
