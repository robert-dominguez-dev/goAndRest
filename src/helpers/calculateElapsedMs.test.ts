import {
  calculateElapsedMs,
  CalculateElapsedMsParams,
} from './calculateElapsedMs.ts';

type TestCase = {
  description: string;
  input: CalculateElapsedMsParams;
  expectedOutputMs: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;

const MOCK_NOW = 1000000;

jest.spyOn(Date, 'now').mockReturnValue(MOCK_NOW);

const testCases: TestCase[] = [
  {
    description: 'should calculate elapsed ms when not paused',
    input: {
      startedAt: MOCK_NOW - 10 * SECOND,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutputMs: 10 * SECOND,
  },
  {
    description: 'should calculate elapsed ms when paused',
    input: {
      startedAt: MOCK_NOW - 20 * SECOND,
      totalPausedTime: 0,
      isPaused: true,
      pausedAt: MOCK_NOW - 5 * SECOND,
    },
    expectedOutputMs: 15 * SECOND,
  },
  {
    description: 'should subtract total paused time when not paused',
    input: {
      startedAt: MOCK_NOW - 30 * SECOND,
      totalPausedTime: 10 * SECOND,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutputMs: 20 * SECOND,
  },
  {
    description: 'should subtract total paused time when paused',
    input: {
      startedAt: MOCK_NOW - 40 * SECOND,
      totalPausedTime: 10 * SECOND,
      isPaused: true,
      pausedAt: MOCK_NOW - 5 * SECOND,
    },
    expectedOutputMs: 25 * SECOND,
  },
  {
    description: 'should handle multiple pause/resume cycles',
    input: {
      startedAt: MOCK_NOW - MINUTE,
      totalPausedTime: 20 * SECOND,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutputMs: 40 * SECOND,
  },
  {
    description: 'should return 0 when just started',
    input: {
      startedAt: MOCK_NOW,
      totalPausedTime: 0,
      isPaused: false,
      pausedAt: null,
    },
    expectedOutputMs: 0,
  },
];

describe('calculateElapsedMs', () => {
  it.each(testCases)('$description', ({ input, expectedOutputMs }) => {
    const result = calculateElapsedMs(input);
    expect(result).toBe(expectedOutputMs);
  });
});
