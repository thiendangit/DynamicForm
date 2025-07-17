import { createStyleSheet } from 'react-native-unistyles';

export const positionSectionListStyles = createStyleSheet(theme => ({
  card: {
    backgroundColor: theme.color.background,
    borderRadius: 18,
    elevation: 2,
    marginBottom: 18,
    padding: 16,
    shadowColor: theme.color.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardHeader: {
    color: theme.color.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: theme.color.error,
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.color.inputBackground,
    borderColor: theme.color.inputBorder,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    marginBottom: 8,
    padding: 12,
  },
  modalCloseBtn: {
    alignItems: 'center',
    marginTop: 12,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: theme.color.background,
    borderRadius: 18,
    elevation: 4,
    minWidth: 260,
    padding: 28,
    shadowColor: theme.color.shadow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: theme.color.overlay,
    flex: 1,
    justifyContent: 'center',
  },
  primaryText: {
    color: theme.color.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: theme.color.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  wrapper: {
    padding: 16,
  },
}));
