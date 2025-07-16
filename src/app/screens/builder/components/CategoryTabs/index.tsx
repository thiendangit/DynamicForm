import React from 'react';
import { View, Text } from '@rn-core';

export default function CategoryTabs() {
    return (
        <View style={{ backgroundColor: '#f3e5f5', padding: 15, marginBottom: 15, borderRadius: 8 }}>
            <Text>🔖 CategoryTabs Component (Phase 1)</Text>
            <Text style={{ marginTop: 5, color: '#666' }}>
                [📋 Positions] [🏢 Work] [🎓 Education] [➕ Add]
            </Text>
        </View>
    );
} 