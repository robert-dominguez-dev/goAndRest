import { AppWorkoutFieldValues } from './types.ts';
import { ONE_SECOND_MS } from '../../constants/common.ts';

export const defaultWorkoutConfig: AppWorkoutFieldValues = {
  workoutName: '',
  work: 90 * ONE_SECOND_MS,
  rest: 30 * ONE_SECOND_MS,
  series: 2,
  rounds: 1,
  recovery: 0,
};
