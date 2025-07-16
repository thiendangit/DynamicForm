import React, { useState } from 'react';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';

import {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useSharedTransition } from '@animated';
import { AnimatedIcon } from '@components/icon';
import { AnimatedView } from '@rn-core';

import { CheckboxProps } from './type';

export const Checkbox = ({
  value,
  initialValue = false,
  onToggle,
  size = 24,
  disabled = false,
}: CheckboxProps) => {
  // state
  const {
    styles,
    theme: { color },
  } = useStyles(stylesSheet);

  const [localValue, setLocalValue] = useState(initialValue);

  const progress = useSharedTransition(
    isTypeof(value, 'boolean') ? value : localValue,
    { duration: 200 },
  );

  // func
  const onPress = () => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);

      setLocalValue(v => !v);
    }
  };

  // style
  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: disabled
        ? color.neutral50
        : interpolateColor(
            progress.value,
            [0, 1],
            [color.neutral50, color.primary500],
          ),
      borderColor: disabled
        ? color.neutral200
        : interpolateColor(
            progress.value,
            [0, 1],
            [color.technical, color.primary500],
          ),
    };
  });

  const iconProps = useAnimatedProps<ImageProps>(() => ({
    tintColor: disabled
      ? color.neutral200
      : interpolateColor(
          progress.value,
          [0, 1],
          ['transparent', color.neutral50],
        ),
  }));

  // render
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <AnimatedView style={[styles.container(size), containerStyle]}>
        <AnimatedIcon size={16} animatedProps={iconProps} icon="done" />
      </AnimatedView>
    </TouchableWithoutFeedback>
  );
};

const stylesSheet = createStyleSheet({
  container: (size: number) => ({
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    height: size,
    justifyContent: 'center',
    position: 'relative',
    width: size,
  }),
});
