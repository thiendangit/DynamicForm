import React, { useEffect } from 'react';
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

interface ProfileFormProps {
  value: ProfileFormValues;
  onChange: (data: ProfileFormValues) => void;
  onSubmit: (data: ProfileFormValues) => void;
}

export default function ProfileForm({
  value,
  onChange,
  onSubmit,
}: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: value,
    resolver: zodResolver(profileSchema),
  });

  const { styles } = useStyles(profileFormStyles);

  useEffect(() => {
    reset(value);
  }, [value, reset]);

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(watch())) {
      onChange(watch());
    }
  }, [onChange, value, watch]);

  return (
    <View>
      <Controller
        control={control}
        name="avatar"
        render={({ field: { value, onChange: onAvatarChange } }) => (
          <AvatarPicker
            value={value}
            onChange={uri => {
              onAvatarChange(uri);

              setValue('avatar', uri, { shouldDirty: true });
            }}
          />
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
