import React from 'react';
import { Pressable } from 'react-native';
import { getOnPressWithHapticFeedback } from '../../controls/helpers/getOnPressWithHapticFeedback.ts';
import {
  AppToggleBase,
  AppToggleBaseProps,
} from './component/AppToggleBase.tsx';

type AppToggleProps = AppToggleBaseProps & {
  onValueChange: (value: boolean) => void;
};

export const AppToggle = ({ value, onValueChange }: AppToggleProps) => (
  <Pressable
    onPress={getOnPressWithHapticFeedback(() => onValueChange(!value))}>
    <AppToggleBase value={value} />
  </Pressable>
);
