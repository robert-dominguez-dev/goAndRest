import { countTotalWorkoutTime } from './countTotalWorkoutTime.ts';
import { AppRunningWorkoutConfig } from '../../RunningWorkoutScreen/types.ts';

type TestCase = {
  description: string;
  input: Partial<AppRunningWorkoutConfig>;
  expectedOutput: number;
};

const testCases: TestCase[] = [
  {
    description: 'invalid when work is zero',
    input: { work: 0, rest: 5, series: 3, rounds: 2, recovery: 10 },
    expectedOutput: 0,
  },
  {
    description: 'invalid when series is zero',
    input: { work: 10, rest: 5, series: 0, rounds: 2, recovery: 10 },
    expectedOutput: 0,
  },
  {
    description: 'invalid when rounds is zero',
    input: { work: 10, rest: 5, series: 2, rounds: 0, recovery: 10 },
    expectedOutput: 0,
  },
  {
    description: 'single series single round',
    input: { work: 10, rest: 5, series: 1, rounds: 1, recovery: 0 },
    expectedOutput: 10,
  },
  {
    description: 'two series one round',
    input: { work: 10, rest: 5, series: 2, rounds: 1, recovery: 0 },
    expectedOutput: 25,
  },
  {
    description: 'two series two rounds with brake',
    input: { work: 10, rest: 5, series: 2, rounds: 2, recovery: 20 },
    expectedOutput: 70,
  },
  {
    description: 'three series three rounds with brake',
    input: { work: 10, rest: 5, series: 3, rounds: 3, recovery: 15 },
    expectedOutput: 150,
  },
  {
    description: 'three series three rounds with brake',
    input: {
      warmup: 15,
      work: 10,
      rest: 5,
      series: 3,
      rounds: 3,
      recovery: 15,
      cooldown: 60,
    },
    expectedOutput: 225,
  },
  {
    description: 'empty input fallback',
    input: {},
    expectedOutput: 0,
  },
];

describe('countTotalWorkoutTime', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(countTotalWorkoutTime(input)).toBe(expectedOutput);
  });
});
