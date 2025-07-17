import { createStyleSheet } from 'react-native-unistyles';

export const addCategoryModalStyles = createStyleSheet(theme => ({
    wrapper: {
        alignSelf: 'center',
        backgroundColor: theme.color.surface,
        borderRadius: 16,
        minWidth: 300,
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: theme.color.textPrimary,
    },
    label: {
        marginBottom: 8,
        color: theme.color.textSecondary,
    },
    input: {
        borderColor: theme.color.inputBorder,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 4,
        padding: 10,
        backgroundColor: theme.color.inputBackground,
        color: theme.color.textPrimary,
    },
    inputError: {
        borderColor: theme.color.error,
    },
    errorText: {
        color: theme.color.error,
        marginBottom: 8,
    },
    btnRow: {
        flexDirection: 'row',
        marginTop: 16,
    },
    addBtn: {
        backgroundColor: theme.color.primary,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
        padding: 12,
    },
    addBtnText: {
        color: theme.color.onPrimary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelBtn: {
        backgroundColor: theme.color.inputBackground,
        borderRadius: 8,
        flex: 1,
        padding: 12,
    },
    cancelBtnText: {
        color: theme.color.textSecondary,
        textAlign: 'center',
    },
})); 