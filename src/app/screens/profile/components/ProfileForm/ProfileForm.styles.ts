import { createStyleSheet } from 'react-native-unistyles';

export const profileFormStyles = createStyleSheet(({ color }) => ({
    colItem: { marginTop: 18 },
    label: { fontWeight: '600', fontSize: 15, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 14,
        padding: 14,
        backgroundColor: '#F7F7FA',
        fontSize: 15,
    },
    inputError: { borderColor: color.danger },
    errorText: { color: color.danger, marginTop: 4, fontSize: 13 },
    infoText: { color: '#A0A0A0', marginTop: 12, fontSize: 14 },
    submitBtn: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: color.primary,
        borderRadius: 14,
        marginTop: 16,
        paddingVertical: 16,
        width: '100%',
        maxWidth: 400,
        shadowColor: color.primary,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 2,
    },
    submitTextBtn: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.5,
    },
})); 