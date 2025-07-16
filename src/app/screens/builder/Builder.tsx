import React from 'react';
import { View, Text } from '@rn-core';
import CategoryTabs from './components/CategoryTabs';
import SectionList from './components/SectionList';

export default function BuilderScreen() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                Builder Screen
            </Text>
            <CategoryTabs />
            <SectionList />
        </View>
    );
} 