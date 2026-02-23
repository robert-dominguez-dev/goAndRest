import { Vibration } from 'react-native';

import { useAtomValue } from 'jotai';
import { vibrationsSettingAtom } from '../contexts/atoms.ts';

const MINIMAL_PAUSE_MS = 300;
const MINIMAL_VIBRATION_MS = 200;

const COUNTDOWN: number[] = [0, MINIMAL_VIBRATION_MS];

const HALF_OF_PHASE: number[] = [
  ...COUNTDOWN,
  MINIMAL_PAUSE_MS,
  MINIMAL_VIBRATION_MS,
];

const PHASE_START: number[] = [
  ...HALF_OF_PHASE,
  MINIMAL_PAUSE_MS,
  MINIMAL_VIBRATION_MS,
];

const WORKOUT_FINISH: number[] = [
  ...PHASE_START,
  MINIMAL_PAUSE_MS,
  MINIMAL_VIBRATION_MS,
];

const vibrationPatterns = {
  COUNTDOWN,
  HALF_OF_PHASE,
  PHASE_START,
  WORKOUT_FINISH,
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
