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

  it('defensively fills in missing fields on an object', () => {
    expect(parseBackup({})).toEqual({ date: null, workouts: [], log: [] });
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
});
