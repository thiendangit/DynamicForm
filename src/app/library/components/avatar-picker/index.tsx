import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import { avatarPickerStyles } from './AvatarPicker.styles.ts';

interface AvatarPickerProps {
  value?: string;
  onChange: (uri: string) => void;
}

export default function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  const { styles } = useStyles(avatarPickerStyles);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            value ? { uri: value } : require('@assets/appicon/appicon.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
