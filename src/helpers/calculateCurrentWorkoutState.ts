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
      phaseRemainingSeconds: warmup - phaseElapsedSeconds,
      phaseElapsedSeconds,
      totalElapsedSeconds,
      totalDurationSeconds: totalDuration,
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
          phaseRemainingSeconds: work - phaseElapsedSeconds,
          phaseElapsedSeconds,
          totalElapsedSeconds,
          totalDurationSeconds: totalDuration,
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
            phaseRemainingSeconds: rest - phaseElapsedSeconds,
            phaseElapsedSeconds,
            totalElapsedSeconds,
            totalDurationSeconds: totalDuration,
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
          phaseRemainingSeconds: recovery - phaseElapsedSeconds,
          phaseElapsedSeconds,
          totalElapsedSeconds,
          totalDurationSeconds: totalDuration,
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
      phaseRemainingSeconds: cooldown - phaseElapsedSeconds,
      phaseElapsedSeconds,
      totalElapsedSeconds,
      totalDurationSeconds: totalDuration,
      isFinished: false,
    };
  }

  /**
   * Determine the final phase props: if cooldown was 0, we stay on WORK.
   */
  const finalPhaseDependentProps: Pick<
    WorkoutTimerComputedState,
    'currentPhase' | 'phaseElapsedSeconds'
  > =
    cooldown > 0
      ? {
          currentPhase: RunningWorkoutPhase.COOLDOWN,
          phaseElapsedSeconds: cooldown,
        }
      : {
          currentPhase: RunningWorkoutPhase.WORK,
          phaseElapsedSeconds: work,
        };

  /**
   * Workout Finished
   */
  return {
    ...finalPhaseDependentProps,
    currentRound: rounds,
    currentSeries: series,
    phaseRemainingSeconds: 0,
    totalElapsedSeconds: Math.min(totalElapsedSeconds, totalDuration),
    totalDurationSeconds: totalDuration,
    isFinished: true,
  };
};
