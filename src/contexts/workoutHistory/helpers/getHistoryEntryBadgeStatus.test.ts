import { getHistoryEntryBadgeStatus } from './getHistoryEntryBadgeStatus.ts';
import { getWorkoutConfigSignature } from './getWorkoutConfigSignature.ts';
import type { WorkoutHistoryEntry } from '../types.ts';
import type { AppWorkoutConfig } from '../../AppWorkoutsProvider/types.ts';

const baseConfig: AppWorkoutConfig = {
  work: 20,
  rest: 10,
  series: 3,
  rounds: 2,
  recovery: 15,
};

const changedConfig: AppWorkoutConfig = {
  ...baseConfig,
  work: 30,
};

const baseEntry: WorkoutHistoryEntry = {
  id: '1',
  date: 1234567890,
  sec: 300,
  rounds: 2,
  rpe: 5,
};

describe('getHistoryEntryBadgeStatus', () => {
  it('returns null when entry has no name', () => {
    const entry: WorkoutHistoryEntry = {
      ...baseEntry,
      config: baseConfig,
    };

    expect(getHistoryEntryBadgeStatus(entry, {})).toBeNull();
  });

  it('returns null when saved config has the same signature', () => {
    const entry: WorkoutHistoryEntry = {
      ...baseEntry,
      name: 'Leg day',
      config: baseConfig,
    };
    const savedSignatureByName = {
      'Leg day': getWorkoutConfigSignature(baseConfig),
    };

    expect(getHistoryEntryBadgeStatus(entry, savedSignatureByName)).toBeNull();
  });

  it("returns 'changed' when saved config has a different signature", () => {
    const entry: WorkoutHistoryEntry = {
      ...baseEntry,
      name: 'Leg day',
      config: changedConfig,
    };
    const savedSignatureByName = {
      'Leg day': getWorkoutConfigSignature(baseConfig),
    };

    expect(getHistoryEntryBadgeStatus(entry, savedSignatureByName)).toBe(
      'changed',
    );
  });

  it("returns 'deleted' when the name is not present in the saved map", () => {
    const entry: WorkoutHistoryEntry = {
      ...baseEntry,
      name: 'Leg day',
      config: baseConfig,
    };
    const savedSignatureByName = {
      'Arm day': getWorkoutConfigSignature(baseConfig),
    };

    expect(getHistoryEntryBadgeStatus(entry, savedSignatureByName)).toBe(
      'deleted',
    );
  });

  it('returns null when name is saved but entry has no config', () => {
    const entry: WorkoutHistoryEntry = {
      ...baseEntry,
      name: 'Leg day',
    };
    const savedSignatureByName = {
      'Leg day': getWorkoutConfigSignature(baseConfig),
    };

    expect(getHistoryEntryBadgeStatus(entry, savedSignatureByName)).toBeNull();
  });
});
