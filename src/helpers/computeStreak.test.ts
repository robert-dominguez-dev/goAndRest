import { computeStreak } from './computeStreak.ts';
import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';

const DAY = 24 * 60 * 60 * 1000;

const now = new Date(2026, 5, 20, 12, 0, 0).getTime();

const createEntry = (date: number): WorkoutHistoryEntry => ({
  date,
  sec: 120,
  rounds: 3,
  rpe: 2,
});

describe('computeStreak', () => {
  type TestCase = {
    description: string;
    log: WorkoutHistoryEntry[];
    expectedOutput: number;
  };

  const testCases: TestCase[] = [
    {
      description: 'returns 0 for an empty log',
      log: [],
      expectedOutput: 0,
    },
    {
      description: 'returns 1 when there is only a workout today',
      log: [createEntry(now)],
      expectedOutput: 1,
    },
    {
      description: 'counts consecutive back-to-back days including today',
      log: [
        createEntry(now),
        createEntry(now - DAY),
        createEntry(now - 2 * DAY),
      ],
      expectedOutput: 3,
    },
    {
      description: 'deduplicates multiple entries on the same day',
      log: [createEntry(now), createEntry(now - 1000), createEntry(now - DAY)],
      expectedOutput: 2,
    },
    {
      description: 'stops counting once a gap breaks the streak',
      log: [
        createEntry(now),
        createEntry(now - DAY),
        createEntry(now - 3 * DAY),
      ],
      expectedOutput: 2,
    },
    {
      description: 'counts from yesterday when there is no workout today yet',
      log: [createEntry(now - DAY), createEntry(now - 2 * DAY)],
      expectedOutput: 2,
    },
    {
      description:
        'returns 0 when the most recent workout is older than yesterday',
      log: [createEntry(now - 2 * DAY)],
      expectedOutput: 0,
    },
  ];

  it.each(testCases)('$description', ({ log, expectedOutput }) => {
    expect(computeStreak(log, now)).toBe(expectedOutput);
  });
});
