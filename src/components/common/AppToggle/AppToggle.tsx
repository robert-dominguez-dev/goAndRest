import React from 'react';
import { Pressable } from 'react-native';
import { getOnPressWithHapticFeedback } from '../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import {
  AppToggleBase,
  AppToggleBaseProps,
} from './component/AppToggleBase.tsx';

type AppToggleProps = AppToggleBaseProps & {
  onValueChange: (value: boolean) => void;
};

export const AppToggle = ({ value, onValueChange }: AppToggleProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(
      () => onValueChange(!value),
      HapticFeedbackTypes.selection,
    )}>
    <AppToggleBase value={value} />
  </Pressable>
);
