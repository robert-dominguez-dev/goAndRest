import { parseBackup } from './parseBackup.ts';
import { AppStoredWorkout } from '../../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutHistoryEntry } from '../../contexts/workoutHistory/types.ts';

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
    recovery: 15,
  },
};

const validEntry: WorkoutHistoryEntry = {
  id: 'entry-1',
  date: 1000,
  sec: 60,
  rounds: 2,
  rpe: 1,
};

describe('parseBackup', () => {
  it('treats an array input as a legacy log-only backup', () => {
    expect(parseBackup([validEntry])).toEqual({
      date: null,
      workouts: [],
      log: [validEntry],
    });
  });

  it('parses a full backup object', () => {
    const raw = {
      date: 123,
      version: 1,
      workouts: [validWorkout],
      log: [validEntry],
    };

    const result = parseBackup(raw);

    expect(result?.date).toBe(123);
    expect(result?.workouts).toHaveLength(1);
    expect(result?.log).toEqual([validEntry]);
  });

  it('returns null for an object with no recoverable data', () => {
    expect(parseBackup({})).toBeNull();
  });

  it('returns null for a backup that contains no workouts and no log', () => {
    expect(parseBackup({ date: 123, workouts: [], log: [] })).toBeNull();
    expect(parseBackup([])).toBeNull();
  });

  it('keeps a backup that has only a log', () => {
    expect(parseBackup({ log: [validEntry] })).toEqual({
      date: null,
      workouts: [],
      log: [validEntry],
    });
  });

  it.each([
    ['a string', 'garbage'],
    ['a number', 42],
    ['null', null],
    ['undefined', undefined],
  ])('returns null for unparseable input (%s)', (_description, input) => {
    expect(parseBackup(input)).toBeNull();
  });

  it('filters out log entries with invalid shapes', () => {
    const raw = {
      log: [
        validEntry,
        { date: 'bad', sec: 1, rounds: 1, rpe: null },
        { sec: 1, rounds: 1, rpe: null },
        { date: 2, sec: 1, rounds: 1, rpe: 'bad' },
      ],
    };

    expect(parseBackup(raw)?.log).toEqual([validEntry]);
  });

  it('filters out invalid workouts while keeping valid ones', () => {
    const raw = { workouts: [validWorkout, { invalid: true }] };

    expect(parseBackup(raw)?.workouts).toHaveLength(1);
  });

  it('preserves a log entry with a valid config, name and savedWorkoutId', () => {
    const entry = {
      ...validEntry,
      config: { work: 20, rest: 10, series: 3, rounds: 2, recovery: 15 },
      name: 'Leg Day',
      savedWorkoutId: 'abc-123',
    };

    expect(parseBackup({ log: [entry] })?.log).toEqual([entry]);
  });

  it('keeps a log entry but drops a malformed config', () => {
    const entry = { ...validEntry, config: { work: 20, rest: 10 } };

    expect(parseBackup({ log: [entry] })?.log).toEqual([validEntry]);
  });

  it('drops non-string name and savedWorkoutId while keeping the entry', () => {
    const entry = { ...validEntry, name: 42, savedWorkoutId: false };

    expect(parseBackup({ log: [entry] })?.log).toEqual([validEntry]);
  });

  it('backfills a missing id with a generated one', () => {
    const entryWithoutId = { date: 1000, sec: 60, rounds: 2, rpe: 1 };

    const parsedEntry = parseBackup({ log: [entryWithoutId] })?.log[0];

    expect(parsedEntry?.id).toEqual(expect.any(String));
    expect(parsedEntry?.id.length).toBeGreaterThan(0);
  });
});
