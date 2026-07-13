import { addWorkoutHistoryEntry } from './addWorkoutHistoryEntry.ts';
import { WorkoutHistoryEntry } from '../types.ts';

const now = new Date('2026-06-20T00:00:00.000Z').getTime();

const createEntry = (date: number): WorkoutHistoryEntry => ({
  id: `entry-${date}`,
  date,
  sec: 120,
  rounds: 3,
  rpe: 2,
});

describe('addWorkoutHistoryEntry', () => {
  type TestCase = {
    description: string;
    log: WorkoutHistoryEntry[];
    entry: WorkoutHistoryEntry;
    expectedOutput: WorkoutHistoryEntry[];
  };

  const testCases: TestCase[] = [
    {
      description: 'prepends entry to an empty log',
      log: [],
      entry: createEntry(now),
      expectedOutput: [createEntry(now)],
    },
    {
      description: 'prepends entry so it becomes the newest first item',
      log: [createEntry(now - 1000)],
      entry: createEntry(now),
      expectedOutput: [createEntry(now), createEntry(now - 1000)],
    },
    {
      description: 'caps the resulting log at 200 entries',
      log: Array.from({ length: 200 }, (_, index) => createEntry(now - index)),
      entry: createEntry(now + 1),
      expectedOutput: [
        createEntry(now + 1),
        ...Array.from({ length: 199 }, (_, index) => createEntry(now - index)),
      ],
    },
  ];

  it.each(testCases)('$description', ({ log, entry, expectedOutput }) => {
    expect(addWorkoutHistoryEntry(log, entry)).toEqual(expectedOutput);
  });

  it('does not mutate the original log', () => {
    const log = [createEntry(now - 1000)];

    addWorkoutHistoryEntry(log, createEntry(now));

    expect(log).toEqual([createEntry(now - 1000)]);
  });
});
