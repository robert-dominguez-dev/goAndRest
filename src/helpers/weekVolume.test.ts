import { weekVolume } from './weekVolume.ts';
import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';

const DAY = 24 * 60 * 60 * 1000;

const now = new Date(2026, 5, 20, 12, 0, 0).getTime();

const createEntry = (date: number): WorkoutHistoryEntry => ({
  id: `entry-${date}`,
  date,
  sec: 120,
  rounds: 3,
  rpe: 2,
});

describe('weekVolume', () => {
  type TestCase = {
    description: string;
    log: WorkoutHistoryEntry[];
    expectedOutput: { min: number; count: number; rounds: number };
  };

  const testCases: TestCase[] = [
    {
      description: 'returns zeros for an empty log',
      log: [],
      expectedOutput: { min: 0, count: 0, rounds: 0 },
    },
    {
      description: 'includes an entry exactly at the 7 day boundary',
      log: [createEntry(now - 7 * DAY)],
      expectedOutput: { min: 2, count: 1, rounds: 3 },
    },
    {
      description: 'excludes an entry just outside the 7 day window',
      log: [createEntry(now - 7 * DAY - 1)],
      expectedOutput: { min: 0, count: 0, rounds: 0 },
    },
    {
      description: 'sums seconds and rounds across multiple entries',
      log: [
        createEntry(now),
        createEntry(now - DAY),
        createEntry(now - 2 * DAY),
      ],
      expectedOutput: { min: 6, count: 3, rounds: 9 },
    },
    {
      description: 'ignores entries outside the window when summing',
      log: [createEntry(now), createEntry(now - 10 * DAY)],
      expectedOutput: { min: 2, count: 1, rounds: 3 },
    },
  ];

  it.each(testCases)('$description', ({ log, expectedOutput }) => {
    expect(weekVolume(log, now)).toEqual(expectedOutput);
  });
});
