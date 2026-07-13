import { WorkoutHistoryEntry } from '../types.ts';
import { getWorkoutConfigSignature } from './getWorkoutConfigSignature.ts';

export const MAX_COMPARED_ENTRIES = 14;

export const getComparableHistoryEntries = (
  log: WorkoutHistoryEntry[],
  entry: WorkoutHistoryEntry,
): WorkoutHistoryEntry[] => {
  const comparableEntries = ((): WorkoutHistoryEntry[] => {
    if (entry.name) {
      return log.filter(e => e.name === entry.name);
    }

    if (entry.config) {
      const signature = getWorkoutConfigSignature(entry.config);

      return log.filter(
        e =>
          !e.name &&
          e.config &&
          getWorkoutConfigSignature(e.config) === signature,
      );
    }

    return [];
  })();

  return [...comparableEntries]
    .sort((a, b) => a.date - b.date)
    .slice(-MAX_COMPARED_ENTRIES);
};
