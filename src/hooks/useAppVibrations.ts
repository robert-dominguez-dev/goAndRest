import { Vibration } from 'react-native';

import { useAtomValue } from 'jotai';
import { vibrationsSettingAtom } from '../contexts/atoms.ts';
import { createVibrationPattern } from '../helpers/createVibrationPattern.ts';

const TRIPLE_VIBRATION_PATTERN = createVibrationPattern(3);

const vibrationPatterns = {
  COUNTDOWN: createVibrationPattern(1),
  HALF_OF_PHASE: createVibrationPattern(2),
  PHASE_START: TRIPLE_VIBRATION_PATTERN,
  WORKOUT_FINISH: TRIPLE_VIBRATION_PATTERN,
} as const satisfies Record<string, number[]>;

export type VibrationPattern = keyof typeof vibrationPatterns;

export const useAppVibrations = () => {
  const isVibrationsSettingEnabled = useAtomValue(vibrationsSettingAtom);

  const stopVibration = () => Vibration.cancel();

  const vibrate = (pattern: VibrationPattern) => {
    if (!isVibrationsSettingEnabled) {
      return undefined;
    }
    stopVibration();
    Vibration.vibrate(vibrationPatterns[pattern]);
  };

  return { vibrate, stopVibration };
};
