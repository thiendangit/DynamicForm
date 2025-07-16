import React from 'react';
import { View, Text } from '@rn-core';

export default function SectionList() {
    return (
        <View style={{ backgroundColor: '#fff3e0', padding: 15, marginBottom: 15, borderRadius: 8 }}>
            <Text>📑 SectionList Component (Phase 1)</Text>
            <Text style={{ marginTop: 5, color: '#666' }}>
                • Section 1: Position Title{'\n'}
                • Section 2: Company Name{'\n'}
                • Section 3: Start Date{'\n'}
                [➕ Add New Section]
            </Text>
        </View>
    );
} 