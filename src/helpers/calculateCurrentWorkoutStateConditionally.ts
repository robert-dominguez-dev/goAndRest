import {
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateCurrentWorkoutState } from './calculateCurrentWorkoutState.ts';

export const calculateCurrentWorkoutStateConditionally = (
  persistedState: WorkoutTimerPersistedState | null,
): WorkoutTimerComputedState | undefined =>
  persistedState ? calculateCurrentWorkoutState(persistedState) : undefined;
