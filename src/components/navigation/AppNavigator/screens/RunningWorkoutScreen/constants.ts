import { RunningWorkoutPhase } from './types.ts';
import { AppColorUnion } from '../../../../../types/ui.ts';

export const workoutPhaseToColorStatus: Record<
  RunningWorkoutPhase,
  AppColorUnion
> = {
  [RunningWorkoutPhase.WARMUP]: 'warmup',
  [RunningWorkoutPhase.WORK]: 'work',
  [RunningWorkoutPhase.REST]: 'rest',
  [RunningWorkoutPhase.RECOVERY]: 'recovery',
  [RunningWorkoutPhase.COOLDOWN]: 'cooldown',
};
