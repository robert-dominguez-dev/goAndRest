import { AppWorkoutConfig } from './types.ts';
import { ONE_SECOND_MS } from '../../constants/common.ts';

export const DEFAULT_WORKOUT_NAME = 'HIIT (2:1)';

export const defaultWorkoutConfig: AppWorkoutConfig = {
  work: 40 * ONE_SECOND_MS,
  rest: 20 * ONE_SECOND_MS,
  series: 8,
  rounds: 2,
  recovery: 90 * ONE_SECOND_MS,
};
