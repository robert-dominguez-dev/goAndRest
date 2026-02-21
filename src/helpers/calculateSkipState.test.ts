import { calculateSkipState } from './calculateSkipState.ts';
import {
  AppRunningWorkoutConfig,
  RunningWorkoutPhase,
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';

type TestCase = {
  description: string;
  input: {
    persistedState: WorkoutTimerPersistedState;
    computedState: WorkoutTimerComputedState;
    msToSkip: number;
  };
  expectedOutput: number;
};

const mockWorkout: AppRunningWorkoutConfig = {
  warmup: 10,
  work: 30,
  rest: 10,
  series: 2,
  rounds: 1,
  recovery: 0,
  cooldown: 0,
};

const testCases: TestCase[] = [
  {
    description: 'should skip forward by standard 10s',
    input: {
      persistedState: {
        workoutConfig: mockWorkout,
        startedAt: 0,
        totalPausedTime: 10000,
        isPaused: false,
        pausedAt: null,
        workoutName: 'test',
      },
      computedState: {
        totalElapsedMs: 40000,
        totalDurationMs: 100000,
        phaseRemainingMs: 20000,
        phaseElapsedMs: 10000,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      msToSkip: 10000,
    },
    expectedOutput: 0,
  },
  {
    description: 'should snap forward to phase end (magnetic)',
    input: {
      persistedState: {
        workoutConfig: mockWorkout,
        startedAt: 0,
        totalPausedTime: 10000,
        isPaused: false,
        pausedAt: null,
        workoutName: 'test',
      },
      computedState: {
        totalElapsedMs: 55000,
        totalDurationMs: 100000,
        phaseRemainingMs: 5000,
        phaseElapsedMs: 25000,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      msToSkip: 15000,
    },
    expectedOutput: 5000,
  },
  {
    description: 'should skip backward by standard 10s',
    input: {
      persistedState: {
        workoutConfig: mockWorkout,
        startedAt: 0,
        totalPausedTime: 10000,
        isPaused: false,
        pausedAt: null,
        workoutName: 'test',
      },
      computedState: {
        totalElapsedMs: 50000,
        totalDurationMs: 100000,
        phaseRemainingMs: 10000,
        phaseElapsedMs: 20000,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      msToSkip: -10000,
    },
    expectedOutput: 20000,
  },
  {
    description: 'should snap backward to phase start (magnetic)',
    input: {
      persistedState: {
        workoutConfig: mockWorkout,
        startedAt: 0,
        totalPausedTime: 10000,
        isPaused: false,
        pausedAt: null,
        workoutName: 'test',
      },
      computedState: {
        totalElapsedMs: 45000,
        totalDurationMs: 100000,
        phaseRemainingMs: 25000,
        phaseElapsedMs: 5000,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      msToSkip: -15000,
    },
    expectedOutput: 15000,
  },
  {
    description: 'should clamp to 0 when skipping backward at workout start',
    input: {
      persistedState: {
        workoutConfig: mockWorkout,
        startedAt: 0,
        totalPausedTime: 0,
        isPaused: false,
        pausedAt: null,
        workoutName: 'test',
      },
      computedState: {
        totalElapsedMs: 5000,
        totalDurationMs: 100000,
        phaseRemainingMs: 5000,
        phaseElapsedMs: 5000,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WARMUP,
        currentRound: 0,
        currentSeries: 0,
      },
      msToSkip: -15000,
    },
    expectedOutput: 5000,
  },
];

describe('calculateSkipState', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = calculateSkipState(
      input.persistedState,
      input.computedState,
      input.msToSkip,
    );
    expect(result.totalPausedTime).toBe(expectedOutput);
  });
});
