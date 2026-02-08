import { safeParseAppWorkouts } from './safeParseAppWorkouts';

type TestCase = {
  description: string;
  input: string | null;
  expectedOutputLength: number;
};

const validWorkout = {
  id: '1',
  meta: {
    name: 'Workout',
    description: 'Desc',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  config: {
    prep: 10,
    work: 20,
    rest: 30,
    rounds: 4,
    cooldown: 5,
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
