import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';

const DAY = 24 * 60 * 60 * 1000;

type WeekVolume = {
  min: number;
  count: number;
  rounds: number;
};

export const weekVolume = (
  log: WorkoutHistoryEntry[],
  now: number = Date.now(),
): WeekVolume => {
  const windowStart = now - 7 * DAY;
  const entriesInWindow = log.filter(entry => entry.date >= windowStart);

  const totalSec = entriesInWindow.reduce((sum, entry) => sum + entry.sec, 0);
  const totalRounds = entriesInWindow.reduce(
    (sum, entry) => sum + entry.rounds,
    0,
  );

  return {
    min: Math.round(totalSec / 60),
    count: entriesInWindow.length,
    rounds: totalRounds,
  };
};
