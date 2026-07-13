import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import type { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';

const DAY_MS = 24 * 60 * 60 * 1000;
const DEMO_LOG_LENGTH = 12;

const DEMO_CONFIG_PRESETS: AppWorkoutConfig[] = [
  { work: 20000, rest: 10000, series: 3, rounds: 4, recovery: 60000 },
  { work: 30000, rest: 15000, series: 4, rounds: 3, recovery: 90000 },
  { work: 45000, rest: 15000, series: 3, rounds: 3, recovery: 120000 },
];

const DEMO_NAMES = ['Tabata Blast', 'Leg Day', 'Core Crusher'];

export const getDemoWorkoutHistoryLog = (now: number): WorkoutHistoryEntry[] =>
  Array.from({ length: DEMO_LOG_LENGTH }, (_, index) => ({
    date: now - index * DAY_MS * 2,
    sec: 660 + ((index * 173) % 540),
    rounds: 2 + (index % 3),
    rpe: Math.min(4, Math.floor(index / 2)),
    config: DEMO_CONFIG_PRESETS[index % DEMO_CONFIG_PRESETS.length],
    name: index % 2 === 0 ? DEMO_NAMES[index % DEMO_NAMES.length] : undefined,
  }));
