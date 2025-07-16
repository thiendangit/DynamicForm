import { createStyleSheet } from 'react-native-unistyles';

export const avatarPickerStyles = createStyleSheet(({ color }) => ({
    container: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        backgroundColor: '#eee',
        borderRadius: 60,
        height: 120,
        width: 120,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    changePhoto: {
        color: color.primary,
        fontWeight: '600',
        marginTop: 10,
        fontSize: 16,
    },
})); 