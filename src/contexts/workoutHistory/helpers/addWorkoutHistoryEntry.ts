import { WorkoutHistoryEntry } from '../types.ts';

const MAX_ENTRIES = 200;

export const addWorkoutHistoryEntry = (
  log: WorkoutHistoryEntry[],
  entry: WorkoutHistoryEntry,
): WorkoutHistoryEntry[] => [entry, ...log].slice(0, MAX_ENTRIES);
