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
    secondsToSkip: number;
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
        totalElapsedSeconds: 40,
        totalDurationSeconds: 100,
        phaseRemainingSeconds: 20,
        phaseElapsedSeconds: 10,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      secondsToSkip: 10,
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
        totalElapsedSeconds: 55,
        totalDurationSeconds: 100,
        phaseRemainingSeconds: 5,
        phaseElapsedSeconds: 25,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      secondsToSkip: 15,
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
        totalElapsedSeconds: 50,
        totalDurationSeconds: 100,
        phaseRemainingSeconds: 10,
        phaseElapsedSeconds: 20,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      secondsToSkip: -10,
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
        totalElapsedSeconds: 45,
        totalDurationSeconds: 100,
        phaseRemainingSeconds: 25,
        phaseElapsedSeconds: 5,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WORK,
        currentRound: 1,
        currentSeries: 1,
      },
      secondsToSkip: -15,
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
        totalElapsedSeconds: 5,
        totalDurationSeconds: 100,
        phaseRemainingSeconds: 5,
        phaseElapsedSeconds: 5,
        isFinished: false,
        currentPhase: RunningWorkoutPhase.WARMUP,
        currentRound: 0,
        currentSeries: 0,
      },
      secondsToSkip: -15,
    },
    expectedOutput: 5000,
  },
];

describe('calculateSkipState', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = calculateSkipState(
      input.persistedState,
      input.computedState,
      input.secondsToSkip,
    );
    expect(result.totalPausedTime).toBe(expectedOutput);
  });
});
