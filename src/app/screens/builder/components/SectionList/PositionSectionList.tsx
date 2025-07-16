import React from 'react';
import { TextInput, TouchableOpacity, Modal } from 'react-native';
import { Text, View } from '@rn-core';
import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props {
    form: any;
    errors: any;
}

export default function PositionSectionList({ form, errors }: Props) {
    const { styles } = useStyles(styleSheet);
    const [showDate, setShowDate] = React.useState(false);
    const startDateValue = form.watch('tabs.0.sections.2.value');
    const handleDateChange = (date: unknown) => {
        setShowDate(false);
        if (date && date instanceof Date && !isNaN(date.getTime())) {
            form.setValue('tabs.0.sections.2.value', dayjs(date).format('YYYY-MM-DD'));
        }
    };
    return (
        <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>Positions</Text>
            {/* Position Title */}
            <View style={styles.card}>
                <Text style={styles.cardHeader}>Position Title</Text>
                <TextInput
                    value={form.watch('tabs.0.sections.0.value')}
                    onChangeText={val => form.setValue('tabs.0.sections.0.value', val)}
                    placeholder="Enter position title"
                    style={styles.input}
                    placeholderTextColor="#B0B0B0"
                />
                {errors?.sections?.[0]?.value && (
                    <Text style={styles.errorText}>{errors.sections[0].value.message}</Text>
                )}
            </View>
            {/* Company Name */}
            <View style={styles.card}>
                <Text style={styles.cardHeader}>Company Name</Text>
                <TextInput
                    value={form.watch('tabs.0.sections.1.value')}
                    onChangeText={val => form.setValue('tabs.0.sections.1.value', val)}
                    placeholder="Enter company name"
                    style={styles.input}
                    placeholderTextColor="#B0B0B0"
                />
                {errors?.sections?.[1]?.value && (
                    <Text style={styles.errorText}>{errors.sections[1].value.message}</Text>
                )}
            </View>
            {/* Start Date */}
            <View style={styles.card}>
                <Text style={styles.cardHeader}>Start Date</Text>
                <TouchableOpacity onPress={() => setShowDate(true)}>
                    <TextInput
                        value={startDateValue}
                        placeholder="YYYY-MM-DD"
                        editable={false}
                        style={[styles.input, { backgroundColor: '#f7f7f7' }]}
                        placeholderTextColor="#B0B0B0"
                    />
                </TouchableOpacity>
                <Modal
                    visible={showDate}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowDate(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <DatePicker
                                date={startDateValue ? dayjs(startDateValue).toDate() : new Date()}
                                onChange={({ date }) => handleDateChange(date)}
                                mode="single"
                                locale="en"
                                calendar="gregory"
                                maxDate={new Date()}
                                style={{ borderRadius: 8 }}
                            />
                            <TouchableOpacity onPress={() => setShowDate(false)} style={styles.modalCloseBtn}>
                                <Text style={styles.primaryText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {errors?.sections?.[2]?.value && (
                    <Text style={styles.errorText}>{errors.sections[2].value.message}</Text>
                )}
            </View>
        </View>
    );
}

const styleSheet = createStyleSheet(theme => ({
    wrapper: {
        padding: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
        color: '#222',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 12,
        fontSize: 15,
        marginBottom: 8,
        backgroundColor: '#FAFAFA',
    },
    errorText: {
        color: '#BC305D',
        fontSize: 13,
        marginBottom: 4,
    },
    primaryText: {
        color: '#4F46E5',
        fontWeight: 'bold',
        fontSize: 13,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 28,
        minWidth: 260,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    modalCloseBtn: {
        marginTop: 12,
        alignItems: 'center',
    },
})); 