import { formatTimerTime } from './formatTimerTime.tsx';

type TestCase = {
  description: string;
  input: number;
  expectedOutput: string;
};

const testCases: TestCase[] = [
  { description: '0 ms returns 0:00', input: 0, expectedOutput: '0:00' },
  {
    description: 'negative000 ms returns 0:00',
    input: -5,
    expectedOutput: '0:00',
  },
  {
    description: '59000 ms returns 0:59',
    input: 59000,
    expectedOutput: '0:59',
  },
  {
    description: '60000 ms returns 1:00',
    input: 60000,
    expectedOutput: '1:00',
  },
  {
    description: '61000 ms returns 1:01',
    input: 61000,
    expectedOutput: '1:01',
  },
  {
    description: '125000 ms returns 2:05',
    input: 125000,
    expectedOutput: '2:05',
  },
  {
    description: '3600000 ms returns 60:00',
    input: 3600000,
    expectedOutput: '60:00',
  },
];

describe('formatTimerTime', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(formatTimerTime(input)).toBe(expectedOutput);
  });
});
