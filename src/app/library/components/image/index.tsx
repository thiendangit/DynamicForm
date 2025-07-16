import React from 'react';
import { StyleSheet } from 'react-native';

import { Image as ExpoImage } from 'expo-image';

import { ImageProps } from './type';

export const Image = ({ ...rest }: ImageProps) => {
  // render
  return (
    <ExpoImage
      transition={{ duration: 300, effect: 'cross-dissolve' }}
      placeholderContentFit="cover"
      placeholder={{
        cacheKey:
          rest.recyclingKey ??
          (typeof rest.source === 'string' ? rest.source : undefined),
        thumbhash: '3PcNNYSFeXh/k0oGLQaSVsN0BVhn2oq2Z5SQUQcZ',
      }}
      {...rest}
      style={StyleSheet.absoluteFillObject}
    />
  );
};
