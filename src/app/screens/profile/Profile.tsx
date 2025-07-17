import React from 'react';

import { useStyles } from 'react-native-unistyles';

import { Screen } from '@components/screen';

import ProfileForm from './components/ProfileForm';
import { styleSheet } from './Profile.styles';
import { useProfileViewModel } from './Profile.viewModel';

export default function ProfileScreen() {
  const { styles } = useStyles(styleSheet);

  const {
    selectors: { profile },
    handlers: { handleChange, handleSubmit },
  } = useProfileViewModel();

  return (
    <Screen
      statusColor="transparent"
      statusBarStyle="dark"
      style={styles.container}
      title={'Profile Screen'}
      scroll>
      <ProfileForm
        value={profile}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Screen>
  );
}
