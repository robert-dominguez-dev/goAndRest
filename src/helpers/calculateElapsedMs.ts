import { WorkoutTimerPersistedState } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

export type CalculateElapsedMsParams = Pick<
  WorkoutTimerPersistedState,
  'startedAt' | 'totalPausedTime' | 'isPaused' | 'pausedAt'
>;

export const calculateElapsedMs = ({
  startedAt,
  totalPausedTime,
  isPaused,
  pausedAt,
}: CalculateElapsedMsParams): number => {
  const referenceTime: number = isPaused && pausedAt ? pausedAt : Date.now();
  const elapsed: number = referenceTime - startedAt - totalPausedTime;
  return Math.max(0, elapsed);
};
