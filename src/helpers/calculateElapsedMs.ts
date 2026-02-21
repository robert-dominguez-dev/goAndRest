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
  const now = Date.now();

  return isPaused && pausedAt
    ? pausedAt - startedAt - totalPausedTime
    : now - startedAt - totalPausedTime;
};
