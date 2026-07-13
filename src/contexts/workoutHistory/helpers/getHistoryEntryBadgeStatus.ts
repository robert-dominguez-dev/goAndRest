import { WorkoutHistoryEntry } from '../types.ts';
import { getWorkoutConfigSignature } from './getWorkoutConfigSignature.ts';

export type HistoryEntryBadgeStatus = 'deleted' | 'changed';

export const getHistoryEntryBadgeStatus = (
  entry: WorkoutHistoryEntry,
  savedSignatureByName: Record<string, string>,
): HistoryEntryBadgeStatus | null => {
  if (!entry.name) {
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(savedSignatureByName, entry.name)) {
    return 'deleted';
  }

  if (
    entry.config &&
    getWorkoutConfigSignature(entry.config) !== savedSignatureByName[entry.name]
  ) {
    return 'changed';
  }

  return null;
};
