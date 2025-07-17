import { createStyleSheet } from 'react-native-unistyles';

export const builderStyles = createStyleSheet(theme => ({
  container: {},
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  autoSaveText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.color.textPrimary,
  },
  saveBtnWrapper: {
    padding: 16,
  },
  saveBtn: {
    alignItems: 'center',
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    opacity: 1,
    padding: 16,
  },
  saveBtnText: {
    color: theme.color.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {},
}));
