import { safeParseAppWorkouts } from './safeParseAppWorkouts';
import { AppStoredWorkout } from '../types.ts';

type TestCase = {
  description: string;
  input: string | null;
  expectedOutputLength: number;
};

const validWorkout: AppStoredWorkout = {
  id: '1',
  meta: {
    name: 'Workout',
    description: 'Desc',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  config: {
    work: 20,
    rest: 10,
    series: 3,
    rounds: 2,
    brake: 15,
  },
};

const testCases: TestCase[] = [
  {
    description: 'returns empty array when input is null',
    input: null,
    expectedOutputLength: 0,
  },
  {
    description: 'returns empty array when JSON is invalid',
    input: '{invalid}',
    expectedOutputLength: 0,
  },
  {
    description: 'returns empty array when parsed value is not array',
    input: JSON.stringify(validWorkout),
    expectedOutputLength: 0,
  },
  {
    description: 'returns parsed workouts when valid array provided',
    input: JSON.stringify([validWorkout]),
    expectedOutputLength: 1,
  },
  {
    description: 'filters out invalid workouts',
    input: JSON.stringify([validWorkout, { invalid: true }]),
    expectedOutputLength: 1,
  },
];

describe('safeParseAppWorkouts', () => {
  it.each(testCases)('$description', ({ input, expectedOutputLength }) => {
    const result = safeParseAppWorkouts(input);
    expect(result.length).toBe(expectedOutputLength);
  });
});
