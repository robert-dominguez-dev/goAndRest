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
  warmup: 10,
  work: 20,
  rest: 10,
  series: 2,
  rounds: 2,
  brake: 30,
  cooldown: 10,
};

const workoutWithoutWarmup: AppRunningWorkoutConfig = {
  warmup: 0,
  work: 20,
  rest: 10,
  series: 2,
  rounds: 2,
  brake: 30,
  cooldown: 10,
};

const workoutWithoutCooldown: AppRunningWorkoutConfig = {
  warmup: 10,
  work: 20,
  rest: 10,
  series: 2,
  rounds: 2,
  brake: 30,
  cooldown: 0,
};

const createPersistedState = (
  elapsedSeconds: number,
): WorkoutTimerPersistedState => ({
  workoutConfig: basicWorkout,
  startedAt: MOCK_NOW - elapsedSeconds * SECOND,
  totalPausedTime: 0,
  isPaused: false,
  pausedAt: null,
  workoutName: WORKOUT_NAME,
});

const testCases: TestCase[] = [
  /**
   * Test case descriptions are kept in English for JSDoc/Test reporting consistency
   */
  {
    description: 'should be in WARMUP phase (5s elapsed)',
    input: createPersistedState(5),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WARMUP,
      currentRound: 0,
      currentSeries: 0,
      phaseRemainingSeconds: 5,
      totalElapsedSeconds: 5,
      totalDurationSeconds: 150,
      isFinished: false,
    },
  },
  {
    description: 'should be in first WORK phase (15s elapsed)',
    input: createPersistedState(15),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WORK,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingSeconds: 15,
      totalElapsedSeconds: 15,
      totalDurationSeconds: 150,
      isFinished: false,
    },
  },
  {
    description: 'should be in first REST phase (35s elapsed)',
    input: createPersistedState(35),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.REST,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingSeconds: 5,
      totalElapsedSeconds: 35,
      totalDurationSeconds: 150,
      isFinished: false,
    },
  },
  {
    description:
      'should be FINISHED exactly at the end of cooldown (150s elapsed)',
    input: createPersistedState(150),
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.COOLDOWN,
      currentRound: 2,
      currentSeries: 2,
      phaseRemainingSeconds: 0,
      totalElapsedSeconds: 150,
      totalDurationSeconds: 150,
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
      phaseRemainingSeconds: 20,
      totalElapsedSeconds: 0,
      totalDurationSeconds: 140,
      isFinished: false,
    },
  },
  {
    description:
      'should be in middle of WORK phase when warmup is 0 (10s elapsed)',
    input: {
      workoutConfig: workoutWithoutWarmup,
      startedAt: MOCK_NOW - 10 * SECOND,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
      workoutName: WORKOUT_NAME,
    },
    expectedOutput: {
      currentPhase: RunningWorkoutPhase.WORK,
      currentRound: 1,
      currentSeries: 1,
      phaseRemainingSeconds: 10,
      totalElapsedSeconds: 10,
      totalDurationSeconds: 140,
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
      phaseRemainingSeconds: 0,
      totalElapsedSeconds: 140,
      totalDurationSeconds: 140,
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
