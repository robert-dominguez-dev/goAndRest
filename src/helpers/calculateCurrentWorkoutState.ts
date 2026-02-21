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
  const totalElapsedSeconds = calculateElapsedMs(params);

  const { warmup, work, rest, series, recovery, rounds, cooldown } =
    workoutConfig;

  const totalDuration = countTotalWorkoutTime(workoutConfig);

  let phaseElapsedSeconds = totalElapsedSeconds;

  /**
   * Handle Warmup Phase
   */
  if (phaseElapsedSeconds < warmup) {
    return {
      currentPhase: RunningWorkoutPhase.WARMUP,
      currentRound: 0,
      currentSeries: 0,
      phaseRemainingMs: warmup - phaseElapsedSeconds,
      phaseElapsedMs: phaseElapsedSeconds,
      totalElapsedMs: totalElapsedSeconds,
      totalDurationMs: totalDuration,
      isFinished: false,
    };
  }

  phaseElapsedSeconds -= warmup;

  /**
   * Iterate through Rounds and Series
   */
  for (let round = 1; round <= rounds; round++) {
    for (let serie = 1; serie <= series; serie++) {
      /**
       * Handle Work Phase
       */
      if (phaseElapsedSeconds < work) {
        return {
          currentPhase: RunningWorkoutPhase.WORK,
          currentRound: round,
          currentSeries: serie,
          phaseRemainingMs: work - phaseElapsedSeconds,
          phaseElapsedMs: phaseElapsedSeconds,
          totalElapsedMs: totalElapsedSeconds,
          totalDurationMs: totalDuration,
          isFinished: false,
        };
      }
      phaseElapsedSeconds -= work;

      /**
       * Handle Rest Phase (only if it's not the last series in the round)
       */
      if (serie < series) {
        if (phaseElapsedSeconds < rest) {
          return {
            currentPhase: RunningWorkoutPhase.REST,
            currentRound: round,
            currentSeries: serie,
            phaseRemainingMs: rest - phaseElapsedSeconds,
            phaseElapsedMs: phaseElapsedSeconds,
            totalElapsedMs: totalElapsedSeconds,
            totalDurationMs: totalDuration,
            isFinished: false,
          };
        }
        phaseElapsedSeconds -= rest;
      }
    }

    /**
     * Handle Recovery Phase (only if it's not the last round)
     */
    if (round < rounds) {
      if (phaseElapsedSeconds < recovery) {
        return {
          currentPhase: RunningWorkoutPhase.RECOVERY,
          currentRound: round,
          currentSeries: series,
          phaseRemainingMs: recovery - phaseElapsedSeconds,
          phaseElapsedMs: phaseElapsedSeconds,
          totalElapsedMs: totalElapsedSeconds,
          totalDurationMs: totalDuration,
          isFinished: false,
        };
      }
      phaseElapsedSeconds -= recovery;
    }
  }

  /**
   * Handle Cooldown Phase
   */
  if (phaseElapsedSeconds < cooldown) {
    return {
      currentPhase: RunningWorkoutPhase.COOLDOWN,
      currentRound: rounds,
      currentSeries: series,
      phaseRemainingMs: cooldown - phaseElapsedSeconds,
      phaseElapsedMs: phaseElapsedSeconds,
      totalElapsedMs: totalElapsedSeconds,
      totalDurationMs: totalDuration,
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
    totalElapsedMs: Math.min(totalElapsedSeconds, totalDuration),
    totalDurationMs: totalDuration,
    isFinished: true,
  };
};
