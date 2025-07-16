import React from 'react';

import { useStyles } from 'react-native-unistyles';

import { Screen } from '@components/screen';

import ProfileForm from './components/ProfileForm';
import { styleSheet } from './Profile.styles';

export default function ProfileScreen() {
  const { styles } = useStyles(styleSheet);

  return (
    <Screen
      statusColor="transparent"
      statusBarStyle="dark"
      style={styles.container}
      title={'Profile Screen'}
      scroll>
      <ProfileForm />
    </Screen>
  );
}
