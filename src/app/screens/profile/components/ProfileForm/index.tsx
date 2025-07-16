import React from 'react';
import { TextInput } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { useStyles } from 'react-native-unistyles';

import AvatarPicker from '@components/avatar-picker';
import { DefaultButton } from '@components/button/default-button';
import { Text } from '@components/core/Text';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from '@rn-core';

import { profileFormStyles } from './ProfileForm.styles';

import { ProfileFormValues, profileSchema } from '../../ProfileForm.schema';

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      avatar: '',
      email: '',
      firstName: '',
      lastName: '',
    },
    resolver: zodResolver(profileSchema),
  });

  const { styles } = useStyles(profileFormStyles);

  const onSubmit = (data: ProfileFormValues) => {
    // TODO: save to storage
    // alert(JSON.stringify(data, null, 2));
  };

  return (
    <View>
      <Controller
        control={control}
        name="avatar"
        render={({ field: { value, onChange } }) => (
          <AvatarPicker value={value} onChange={onChange} />
        )}
      />
      <View style={styles.colItem}>
        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName.message}</Text>
        )}
      </View>
      <View style={styles.colItem}>
        <Text style={styles.label}>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName.message}</Text>
        )}
      </View>
      <View style={styles.colItem}>
        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email Address"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>
      <Text style={styles.infoText}>
        We'll never share your email with anyone else.
      </Text>
      <View style={styles.colItem}>
        <DefaultButton
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}>
          <Text style={styles.submitTextBtn}>Save</Text>
        </DefaultButton>
      </View>
    </View>
  );
}
