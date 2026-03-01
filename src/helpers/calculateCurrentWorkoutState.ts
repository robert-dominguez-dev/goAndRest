import {
  RunningWorkoutPhase,
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateElapsedMs } from './calculateElapsedMs.ts';
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
  const totalElapsedMs = calculateElapsedMs(params);

  const { warmup, work, rest, series, recovery, rounds, cooldown } =
    workoutConfig;

  const totalDurationMs = countTotalWorkoutTime(workoutConfig);

  let phaseElapsedMs = totalElapsedMs;

  /**
   * Handle Warmup Phase
   */
  if (phaseElapsedMs < warmup) {
    return {
      currentPhase: RunningWorkoutPhase.WARMUP,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingMs: warmup - phaseElapsedMs,
      phaseElapsedMs,
      totalElapsedMs,
      totalDurationMs,
      isFinished: false,
    };
  }

  phaseElapsedMs -= warmup;

  /**
   * Iterate through Rounds and Series
   */
  for (let round = 1; round <= rounds; round++) {
    for (let serie = 1; serie <= series; serie++) {
      /**
       * Handle Work Phase
       */
      if (phaseElapsedMs < work) {
        return {
          currentPhase: RunningWorkoutPhase.WORK,
          currentRound: round,
          currentSeries: serie,
          phaseRemainingMs: work - phaseElapsedMs,
          phaseElapsedMs,
          totalElapsedMs,
          totalDurationMs,
          isFinished: false,
        };
      }
      phaseElapsedMs -= work;

      /**
       * Handle Rest Phase (only if it's not the last series in the round)
       */
      if (serie < series) {
        if (phaseElapsedMs < rest) {
          return {
            currentPhase: RunningWorkoutPhase.REST,
            currentRound: round,
            currentSeries: serie,
            phaseRemainingMs: rest - phaseElapsedMs,
            phaseElapsedMs,
            totalElapsedMs,
            totalDurationMs,
            isFinished: false,
          };
        }
        phaseElapsedMs -= rest;
      }
    }

    /**
     * Handle Recovery Phase (only if it's not the last round)
     */
    if (round < rounds) {
      if (phaseElapsedMs < recovery) {
        return {
          currentPhase: RunningWorkoutPhase.RECOVERY,
          currentRound: round,
          currentSeries: series,
          phaseRemainingMs: recovery - phaseElapsedMs,
          phaseElapsedMs,
          totalElapsedMs,
          totalDurationMs,
          isFinished: false,
        };
      }
      phaseElapsedMs -= recovery;
    }
  }

  /**
   * Handle Cooldown Phase
   */
  if (phaseElapsedMs < cooldown) {
    return {
      currentPhase: RunningWorkoutPhase.COOLDOWN,
      currentRound: rounds,
      currentSeries: series,
      phaseRemainingMs: cooldown - phaseElapsedMs,
      phaseElapsedMs,
      totalElapsedMs,
      totalDurationMs,
      isFinished: false,
    };
  }

  /**
   * Determine the final phase props: if cooldown was 0, we stay on WORK.
   */
  const finalPhaseDependentProps: Pick<
    WorkoutTimerComputedState,
    'currentPhase' | 'phaseElapsedMs'
  > =
    cooldown > 0
      ? {
          currentPhase: RunningWorkoutPhase.COOLDOWN,
          phaseElapsedMs: cooldown,
        }
      : {
          currentPhase: RunningWorkoutPhase.WORK,
          phaseElapsedMs: work,
        };

  /**
   * Workout Finished
   */
  return {
    ...finalPhaseDependentProps,
    currentRound: rounds,
    currentSeries: series,
    phaseRemainingMs: 0,
    totalElapsedMs: Math.min(totalElapsedMs, totalDurationMs),
    totalDurationMs,
    isFinished: true,
  };
};
