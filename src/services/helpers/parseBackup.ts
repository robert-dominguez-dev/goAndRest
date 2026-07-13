import { v4 as uuidv4 } from 'uuid';
import { AppWorkoutSchema } from '../../contexts/AppWorkoutsProvider/helpers/safeParseAppWorkouts.ts';
import {
  AppStoredWorkout,
  AppWorkoutConfig,
} from '../../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutHistoryEntry } from '../../contexts/workoutHistory/types.ts';

export type ParsedBackup = {
  date: number | null;
  workouts: AppStoredWorkout[];
  log: WorkoutHistoryEntry[];
};

const parseWorkouts = (value: unknown): AppStoredWorkout[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<AppStoredWorkout[]>((acc, item) => {
    const result = AppWorkoutSchema.safeParse(item);

    if (result.success) {
      acc.push(result.data);
    }

    return acc;
  }, []);
};

const isValidLogEntry = (entry: unknown): entry is WorkoutHistoryEntry => {
  if (typeof entry !== 'object' || entry === null) {
    return false;
  }

  const record = entry as Record<string, unknown>;

  return (
    typeof record.date === 'number' &&
    typeof record.sec === 'number' &&
    typeof record.rounds === 'number' &&
    (typeof record.rpe === 'number' || record.rpe === null)
  );
};

const CONFIG_KEYS = ['work', 'rest', 'series', 'rounds', 'recovery'] as const;

const parseConfig = (value: unknown): AppWorkoutConfig | undefined => {
  if (typeof value !== 'object' || value === null) {
    return undefined;
  }

  const record = value as Record<string, unknown>;

  const isValid = CONFIG_KEYS.every(
    key => typeof record[key] === 'number' && Number.isFinite(record[key]),
  );

  return isValid
    ? {
        work: Number(record.work),
        rest: Number(record.rest),
        series: Number(record.series),
        rounds: Number(record.rounds),
        recovery: Number(record.recovery),
      }
    : undefined;
};

const parseLog = (value: unknown): WorkoutHistoryEntry[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isValidLogEntry).map(entry => {
    const { date, sec, rounds, rpe } = entry;
    const record = entry as Record<string, unknown>;

    const id = typeof record.id === 'string' ? record.id : uuidv4();
    const config = parseConfig(record.config);
    const savedWorkoutId =
      typeof record.savedWorkoutId === 'string'
        ? record.savedWorkoutId
        : undefined;
    const name = typeof record.name === 'string' ? record.name : undefined;

    return {
      id,
      date,
      sec,
      rounds,
      rpe,
      ...(config !== undefined && { config }),
      ...(savedWorkoutId !== undefined && { savedWorkoutId }),
      ...(name !== undefined && { name }),
    };
  });
};

// A backup with no recoverable workouts and no history entries is
// indistinguishable from a foreign/garbage JSON file. Restoring it would
// silently wipe the user's real data, so it is treated as invalid.
const buildBackup = (
  date: number | null,
  workouts: AppStoredWorkout[],
  log: WorkoutHistoryEntry[],
): ParsedBackup | null =>
  workouts.length === 0 && log.length === 0 ? null : { date, workouts, log };

export const parseBackup = (raw: unknown): ParsedBackup | null => {
  if (Array.isArray(raw)) {
    return buildBackup(null, [], parseLog(raw));
  }

  if (typeof raw === 'object' && raw !== null) {
    const record = raw as Record<string, unknown>;

    return buildBackup(
      typeof record.date === 'number' ? record.date : null,
      parseWorkouts(record.workouts),
      parseLog(record.log),
    );
  }

  return null;
};
