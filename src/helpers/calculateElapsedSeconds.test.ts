import {
  calculateElapsedMs,
  CalculateElapsedMsParams,
} from './calculateElapsedMs.ts';

type TestCase = {
  description: string;
  input: CalculateElapsedMsParams;
  expectedOutput: number;
};

const MINUTE = 60 * 1000;
const SECOND = 1000;

const testCases: TestCase[] = [
  {
    description: 'should calculate elapsed seconds when not paused',
    input: {
      startedAt: Date.now() - 10 * SECOND,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutput: 10,
  },
  {
    description: 'should calculate elapsed seconds when paused',
    input: {
      startedAt: Date.now() - 20 * SECOND,
      totalPausedTime: 0,
      isPaused: true,
      pausedAt: Date.now() - 5 * SECOND,
    },
    expectedOutput: 15,
  },
  {
    description: 'should subtract total paused time when not paused',
    input: {
      startedAt: Date.now() - 30 * SECOND,
      totalPausedTime: 10 * SECOND,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutput: 20,
  },
  {
    description: 'should subtract total paused time when paused',
    input: {
      startedAt: Date.now() - 40 * SECOND,
      totalPausedTime: 10 * SECOND,
      isPaused: true,
      pausedAt: Date.now() - 5 * SECOND,
    },
    expectedOutput: 25,
  },
  {
    description: 'should handle multiple pause/resume cycles',
    input: {
      startedAt: Date.now() - MINUTE,
      totalPausedTime: 20 * SECOND,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutput: 40,
  },
  {
    description: 'should return 0 when just started',
    input: {
      startedAt: Date.now(),
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutput: 0,
  },
];

describe('calculateElapsedSeconds', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    const result = calculateElapsedMs(input);
    expect(result).toBeGreaterThanOrEqual(expectedOutput);
    expect(result).toBeLessThanOrEqual(expectedOutput + 1);
  });
});
