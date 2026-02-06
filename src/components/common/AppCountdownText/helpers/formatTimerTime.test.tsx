import { formatTimerTime } from './formatTimerTime.tsx';

type TestCase = {
  description: string;
  input: number;
  expectedOutput: string;
};

const testCases: TestCase[] = [
  { description: '0 seconds returns 0:00', input: 0, expectedOutput: '0:00' },
  {
    description: 'negative seconds returns 0:00',
    input: -5,
    expectedOutput: '0:00',
  },
  { description: '59 seconds returns 0:59', input: 59, expectedOutput: '0:59' },
  { description: '60 seconds returns 1:00', input: 60, expectedOutput: '1:00' },
  { description: '61 seconds returns 1:01', input: 61, expectedOutput: '1:01' },
  {
    description: '125 seconds returns 2:05',
    input: 125,
    expectedOutput: '2:05',
  },
  {
    description: '3600 seconds returns 60:00',
    input: 3600,
    expectedOutput: '60:00',
  },
];

describe('formatTimerTime', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(formatTimerTime(input)).toBe(expectedOutput);
  });
});
