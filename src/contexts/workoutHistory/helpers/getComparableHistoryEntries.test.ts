import {
  getComparableHistoryEntries,
  MAX_COMPARED_ENTRIES,
} from './getComparableHistoryEntries.ts';
import { WorkoutHistoryEntry } from '../types.ts';
import { AppWorkoutConfig } from '../../AppWorkoutsProvider/types.ts';

const baseConfig: AppWorkoutConfig = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

const differentConfig: AppWorkoutConfig = {
  ...baseConfig,
  work: 30,
};

const buildEntry = (
  overrides: Partial<WorkoutHistoryEntry>,
): WorkoutHistoryEntry => ({
  id: 'id',
  date: 0,
  sec: 100,
  rounds: 2,
  rpe: 5,
  config: baseConfig,
  ...overrides,
});

describe('getComparableHistoryEntries', () => {
  it('for a named entry, includes only same-name entries that share the config signature', () => {
    const entry = buildEntry({ id: 'entry', date: 4, name: 'Leg day' });
    const sameNameSameConfig = buildEntry({
      id: 'same-name-same-config',
      date: 1,
      name: 'Leg day',
    });
    const sameNameDifferentConfig = buildEntry({
      id: 'same-name-different-config',
      date: 2,
      name: 'Leg day',
      config: differentConfig,
    });
    const differentName = buildEntry({
      id: 'different-name',
      date: 3,
      name: 'Arm day',
    });
    const anonymousSameConfig = buildEntry({
      id: 'anonymous-same-config',
      date: 3,
    });

    const result = getComparableHistoryEntries(
      [
        sameNameSameConfig,
        sameNameDifferentConfig,
        differentName,
        anonymousSameConfig,
        entry,
      ],
      entry,
    );

    expect(result).toEqual([sameNameSameConfig, entry]);
  });

  it('for an anonymous entry, includes only anonymous entries with the same config signature and excludes named entries with a matching config', () => {
    const entry = buildEntry({ id: 'entry', date: 3 });
    const sameConfigAnonymous = buildEntry({
      id: 'same-config-anonymous',
      date: 1,
    });
    const sameConfigNamed = buildEntry({
      id: 'same-config-named',
      date: 2,
      name: 'Leg day',
    });
    const differentConfigAnonymous = buildEntry({
      id: 'different-config-anonymous',
      date: 2,
      config: differentConfig,
    });

    const result = getComparableHistoryEntries(
      [sameConfigAnonymous, sameConfigNamed, differentConfigAnonymous, entry],
      entry,
    );

    expect(result).toEqual([sameConfigAnonymous, entry]);
  });

  it('excludes entries without a rated difficulty (rpe null)', () => {
    const entry = buildEntry({ id: 'entry', date: 3, name: 'Leg day' });
    const ratedSibling = buildEntry({ id: 'rated', date: 1, name: 'Leg day' });
    const unratedSibling = buildEntry({
      id: 'unrated',
      date: 2,
      name: 'Leg day',
      rpe: null,
    });

    const result = getComparableHistoryEntries(
      [ratedSibling, unratedSibling, entry],
      entry,
    );

    expect(result.map(e => e.id)).toEqual(['rated', 'entry']);
  });

  it('excludes the target entry itself when it is unrated', () => {
    const entry = buildEntry({
      id: 'entry',
      date: 3,
      name: 'Leg day',
      rpe: null,
    });
    const ratedSibling = buildEntry({ id: 'rated', date: 1, name: 'Leg day' });

    const result = getComparableHistoryEntries([ratedSibling, entry], entry);

    expect(result.map(e => e.id)).toEqual(['rated']);
  });

  it('returns an empty array for an entry without a config', () => {
    const entry = buildEntry({ id: 'entry', date: 1, config: undefined });
    const other = buildEntry({ id: 'other', date: 2 });

    expect(getComparableHistoryEntries([entry, other], entry)).toEqual([]);
  });

  it('sorts the result ascending by date', () => {
    const entry = buildEntry({ id: 'entry', date: 5, name: 'Leg day' });
    const earliest = buildEntry({ id: 'earliest', date: 1, name: 'Leg day' });
    const middle = buildEntry({ id: 'middle', date: 3, name: 'Leg day' });

    const result = getComparableHistoryEntries(
      [entry, earliest, middle],
      entry,
    );

    expect(result.map(e => e.id)).toEqual(['earliest', 'middle', 'entry']);
  });

  it('trims the result to the last MAX_COMPARED_ENTRIES when exceeded', () => {
    const entriesCount = 16;
    const entries = Array.from({ length: entriesCount }, (_, index) =>
      buildEntry({ id: `entry-${index}`, date: index, name: 'Leg day' }),
    );
    const entry = entries[entriesCount - 1];

    const result = getComparableHistoryEntries(entries, entry);

    expect(result).toHaveLength(MAX_COMPARED_ENTRIES);
    expect(result.map(e => e.id)).toEqual(
      entries.slice(-MAX_COMPARED_ENTRIES).map(e => e.id),
    );
  });

  it('does not modify the input array', () => {
    const entry = buildEntry({ id: 'entry', date: 3, name: 'Leg day' });
    const earliest = buildEntry({ id: 'earliest', date: 1, name: 'Leg day' });
    const middle = buildEntry({ id: 'middle', date: 2, name: 'Leg day' });
    const log = [entry, earliest, middle];
    const logCopy = [...log];

    getComparableHistoryEntries(log, entry);

    expect(log).toEqual(logCopy);
  });
});
