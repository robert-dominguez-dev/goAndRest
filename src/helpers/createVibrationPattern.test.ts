import { createVibrationPattern } from './createVibrationPattern.ts';

type TestCase = {
  description: string;
  input: number;
  expectedOutput: number[];
};

const testCases: TestCase[] = [
  {
    description: '0 times returns empty array',
    input: 0,
    expectedOutput: [],
  },
  {
    description: '1 time returns initial trigger then run',
    input: 1,
    expectedOutput: [1, 400],
  },
  {
    description: '2 times returns trigger/run then pause/run',
    input: 2,
    expectedOutput: [1, 400, 200, 400],
  },
  {
    description: '3 times returns trigger/run then two pause/run pairs',
    input: 3,
    expectedOutput: [1, 400, 200, 400, 200, 400],
  },
];

describe('createVibrationPattern', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(createVibrationPattern(input)).toEqual(expectedOutput);
  });
});
