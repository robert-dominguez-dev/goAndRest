import {
  RunningWorkoutPhase,
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateElapsedSeconds } from './calculateElapsedSeconds.ts';
import {
  countTotalWorkoutTime
} from '../components/navigation/AppNavigator/screens/LandingScreen/helpers/countTotalWorkoutTime.ts';

/**
 * Calculates the current state of a running workout based on the elapsed time.
 * Iterates through workout phases (warmup, rounds, series, cooldown) and determines
 * which phase, round, and series is currently active.
 */
export const calculateCurrentWorkoutState = ({
  workoutConfig,
  ...params
}: WorkoutTimerPersistedState): WorkoutTimerComputedState => {
  const totalElapsedSeconds = calculateElapsedSeconds(params);

  const { warmup, work, rest, series, brake, rounds, cooldown } = workoutConfig;

  const totalDuration = countTotalWorkoutTime(workoutConfig);

  let remaining = totalElapsedSeconds;

  /**
   * Handle Warmup Phase
   */
  if (remaining < warmup) {
    return {
      currentPhase: RunningWorkoutPhase.WARMUP,
      currentRound: 0,
      currentSeries: 0,
      phaseRemainingSeconds: warmup - remaining,
      totalElapsedSeconds,
      totalDurationSeconds: totalDuration,
      isFinished: false,
    };
  }
  remaining -= warmup;

  /**
   * Iterate through Rounds and Series
   */
  for (let round = 1; round <= rounds; round++) {
    for (let serie = 1; serie <= series; serie++) {
      /**
       * Handle Work Phase
       */
      if (remaining < work) {
        return {
          currentPhase: RunningWorkoutPhase.WORK,
          currentRound: round,
          currentSeries: serie,
          phaseRemainingSeconds: work - remaining,
          totalElapsedSeconds,
          totalDurationSeconds: totalDuration,
          isFinished: false,
        };
      }
      remaining -= work;

      /**
       * Handle Rest Phase (only if it's not the last series in the round)
       */
      if (serie < series) {
        if (remaining < rest) {
          return {
            currentPhase: RunningWorkoutPhase.REST,
            currentRound: round,
            currentSeries: serie,
            phaseRemainingSeconds: rest - remaining,
            totalElapsedSeconds,
            totalDurationSeconds: totalDuration,
            isFinished: false,
          };
        }
        remaining -= rest;
      }
    }

    /**
     * Handle Brake Phase (only if it's not the last round)
     */
    if (round < rounds) {
      if (remaining < brake) {
        return {
          currentPhase: RunningWorkoutPhase.BREAK,
          currentRound: round,
          currentSeries: series,
          phaseRemainingSeconds: brake - remaining,
          totalElapsedSeconds,
          totalDurationSeconds: totalDuration,
          isFinished: false,
        };
      }
      remaining -= brake;
    }
  }

  /**
   * Handle Cooldown Phase
   */
  if (remaining < cooldown) {
    return {
      currentPhase: RunningWorkoutPhase.COOLDOWN,
      currentRound: rounds,
      currentSeries: series,
      phaseRemainingSeconds: cooldown - remaining,
      totalElapsedSeconds,
      totalDurationSeconds: totalDuration,
      isFinished: false,
    };
  }

  /**
   * Determine the final phase: if cooldown was 0, we stay on WORK.
   */
  const finalPhase =
    cooldown > 0 ? RunningWorkoutPhase.COOLDOWN : RunningWorkoutPhase.WORK;

  /**
   * Workout Finished
   */
  return {
    currentPhase: finalPhase,
    currentRound: rounds,
    currentSeries: series,
    phaseRemainingSeconds: 0,
    totalElapsedSeconds: Math.min(totalElapsedSeconds, totalDuration),
    totalDurationSeconds: totalDuration,
    isFinished: true,
  };
};
