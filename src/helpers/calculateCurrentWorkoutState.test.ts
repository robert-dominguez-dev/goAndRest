import {
  AppRunningWorkoutConfig,
  RunningWorkoutPhase,
  WorkoutTimerComputedState,
  WorkoutTimerPersistedState,
} from '../components/navigation/AppNavigator/screens/RunningWorkoutScreen/types.ts';
import { calculateCurrentWorkoutState } from './calculateCurrentWorkoutState.ts';

type TestCase = {
  description: string;
  input: WorkoutTimerPersistedState;
  expectedOutput: WorkoutTimerComputedState;
};

const MOCK_NOW = 1700000000000;
const SECOND = 1000;
const WORKOUT_NAME = 'workout';

const basicWorkout: AppRunningWorkoutConfig = {
  warmup: 10 * SECOND,
  work: 20 * SECOND,
  rest: 10 * SECOND,
  series: 2,
  rounds: 2,
  recovery: 30 * SECOND,
  cooldown: 10 * SECOND,
};

const workoutWithoutWarmup: AppRunningWorkoutConfig = {
  ...basicWorkout,
  warmup: 0,
};

const workoutWithoutCooldown: AppRunningWorkoutConfig = {
  ...basicWorkout,
  cooldown: 0,
};

const createPersistedState = (
  elapsedMs: number,
): WorkoutTimerPersistedState => ({
  workoutConfig: basicWorkout,
  startedAt: MOCK_NOW - elapsedMs,
  totalPausedTime: 0,
  isPaused: false,
  pausedAt: null,
  workoutName: WORKOUT_NAME,
});

const testCases: TestCase[] = [
  {
    description: 'should be in WARMUP phase (5s elapsed)',
    input: createPersistedState(5 * SECOND),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WARMUP,
      currentRound: 0,
      currentSeries: 0,
      phaseRemainingMs: 5 * SECOND,
      phaseElapsedMs: 5 * SECOND,
      totalElapsedMs: 5 * SECOND,
      totalDurationMs: 150 * SECOND,
      isFinished: false,
    },
  },
  {
    description: 'should be in first WORK phase (15s elapsed)',
    input: createPersistedState(15 * SECOND),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WORK,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingMs: 15 * SECOND,
      phaseElapsedMs: 5 * SECOND,
      totalElapsedMs: 15 * SECOND,
      totalDurationMs: 150 * SECOND,
      isFinished: false,
    },
  },
  {
    description: 'should be in first REST phase (35s elapsed)',
    input: createPersistedState(35 * SECOND),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.REST,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingMs: 5 * SECOND,
      phaseElapsedMs: 5 * SECOND,
      totalElapsedMs: 35 * SECOND,
      totalDurationMs: 150 * SECOND,
      isFinished: false,
    },
  },
  {
    description:
      'should be FINISHED exactly at the end of cooldown (150s elapsed)',
    input: createPersistedState(150 * SECOND),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.COOLDOWN,
      currentRound: 2,
      currentSeries: 2,
      phaseRemainingMs: 0,
      phaseElapsedMs: 10 * SECOND,
      totalElapsedMs: 150 * SECOND,
      totalDurationMs: 150 * SECOND,
      isFinished: true,
    },
  },
  {
    description:
      'should skip WARMUP and start with WORK phase when warmup is 0',
    input: {
      workoutConfig: workoutWithoutWarmup,
      startedAt: MOCK_NOW,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
      workoutName: WORKOUT_NAME,
    },
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WORK,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingMs: 20 * SECOND,
      phaseElapsedMs: 0,
      totalElapsedMs: 0,
      totalDurationMs: 140 * SECOND,
      isFinished: false,
    },
  },
  {
    description:
      'should finish immediately after last work/brake when cooldown is 0',
    input: {
      workoutConfig: workoutWithoutCooldown,
      startedAt: MOCK_NOW - 140 * SECOND,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
      workoutName: WORKOUT_NAME,
    },
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WORK,
      currentRound: 2,
      currentSeries: 2,
      phaseRemainingMs: 0,
      phaseElapsedMs: 20 * SECOND,
      totalElapsedMs: 140 * SECOND,
      totalDurationMs: 140 * SECOND,
      isFinished: true,
    },
  },
];

describe('calculateCurrentWorkoutState', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_NOW);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = calculateCurrentWorkoutState(input);
    expect(result).toEqual(expectedOutput);
  });
});
