import { AppWorkoutFieldValues } from './types.ts';
import { ONE_SECOND_MS } from '../../constants/common.ts';

export const defaultWorkoutConfig: AppWorkoutFieldValues = {
  workoutName: 'HIIT (2:1)',
  work: 40 * ONE_SECOND_MS,
  rest: 20 * ONE_SECOND_MS,
  series: 8,
  rounds: 2,
  recovery: 90 * ONE_SECOND_MS,
};
