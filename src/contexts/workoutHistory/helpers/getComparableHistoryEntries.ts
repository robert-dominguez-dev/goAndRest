import { WorkoutHistoryEntry } from '../types.ts';
import { getWorkoutConfigSignature } from './getWorkoutConfigSignature.ts';

export const MAX_COMPARED_ENTRIES = 14;

export const getComparableHistoryEntries = (
  log: WorkoutHistoryEntry[],
  entry: WorkoutHistoryEntry,
): WorkoutHistoryEntry[] => {
  const comparableEntries = ((): WorkoutHistoryEntry[] => {
    if (!entry.config) {
      return [];
    }

    const signature = getWorkoutConfigSignature(entry.config);

    // Compare by config signature so entries sharing a name but with a
    // config the user changed over time are not lumped together; named
    // entries additionally match on the name, anonymous ones on being nameless.
    return log.filter(
      e =>
        e.config &&
        getWorkoutConfigSignature(e.config) === signature &&
        (entry.name ? e.name === entry.name : !e.name),
    );
  })();

  return [...comparableEntries]
    .sort((a, b) => a.date - b.date)
    .slice(-MAX_COMPARED_ENTRIES);
};
