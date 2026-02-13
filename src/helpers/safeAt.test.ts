import { safeAt } from './safeAt.ts';

type TestCase = {
  description: string;
  input: { array: unknown[]; index: number };
  expectedOutput: unknown;
};

const testCases: TestCase[] = [
  {
    description: 'returns item at valid positive index',
    input: { array: [10, 20, 30], index: 1 },
    expectedOutput: 20,
  },
  {
    description: 'returns undefined for out of bounds positive index',
    input: { array: [10, 20, 30], index: 5 },
    expectedOutput: undefined,
  },
  {
    description: 'returns undefined for negative index',
    input: { array: [10, 20, 30], index: -1 },
    expectedOutput: undefined,
  },
  {
    description: 'returns undefined for empty array',
    input: { array: [], index: 0 },
    expectedOutput: undefined,
  },
  {
    description: 'works with string array',
    input: { array: ['a', 'b', 'c'], index: 2 },
    expectedOutput: 'c',
  },
];

describe('safeAt function', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(safeAt(input.array, input.index)).toBe(expectedOutput);
  });
});
