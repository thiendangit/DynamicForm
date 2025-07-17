import {createStyleSheet} from 'react-native-unistyles';

export const datePickModalStyles = createStyleSheet({
    closeBtn: {
        alignItems: 'center',
        marginTop: 12,
    },
    closeText: {
        color: '#BC305D',
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        minWidth: 260,
        padding: 28,
        width: '90%',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.18)',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});
