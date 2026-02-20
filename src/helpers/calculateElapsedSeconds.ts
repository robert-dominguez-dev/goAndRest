import { WorkoutTimerPersistedState } from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { ONE_SECOND_MS } from '../constants/common.ts';

export type CalculateElapsedSecondsParams = Pick<
  WorkoutTimerPersistedState,
  'startedAt' | 'totalPausedTime' | 'isPaused' | 'pausedAt'
>;

export const calculateElapsedSeconds = ({
  startedAt,
  totalPausedTime,
  isPaused,
  pausedAt,
}: CalculateElapsedSecondsParams): number => {
  const now = Date.now();

  const elapsed: number =
    isPaused && pausedAt
      ? pausedAt - startedAt - totalPausedTime
      : now - startedAt - totalPausedTime;

  return Math.floor(elapsed / ONE_SECOND_MS);
};
