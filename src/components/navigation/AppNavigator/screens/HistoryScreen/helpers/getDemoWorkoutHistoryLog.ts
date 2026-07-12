import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';

const DAY_MS = 24 * 60 * 60 * 1000;
const DEMO_LOG_LENGTH = 12;

export const getDemoWorkoutHistoryLog = (now: number): WorkoutHistoryEntry[] =>
  Array.from({ length: DEMO_LOG_LENGTH }, (_, index) => ({
    date: now - index * DAY_MS * 2,
    sec: 660 + ((index * 173) % 540),
    rounds: 2 + (index % 3),
    rpe: Math.min(4, Math.floor(index / 2)),
  }));
