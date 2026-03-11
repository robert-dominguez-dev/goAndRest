import { IS_ANDROID } from '../constants/common.ts';

/**
 * On iOS the vibration duration is fixed,
 * therefore we make it fixed for both platforms...
 */
export const FIXED_RUN_VIBRATION_MS = IS_ANDROID ? 200 : 400;
export const FIXED_PAUSE_VIBRATION_MS = 200;

export const createVibrationPattern = (times: number): number[] =>
  Array.from({ length: times }).flatMap<number>((_, index) => [
    index === 0 ? 1 : FIXED_PAUSE_VIBRATION_MS,
    FIXED_RUN_VIBRATION_MS,
  ]);
