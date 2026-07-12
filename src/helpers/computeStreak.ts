import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';

const DAY = 24 * 60 * 60 * 1000;

export const computeStreak = (
  log: WorkoutHistoryEntry[],
  now: number = Date.now(),
): number => {
  const uniqueDays = Array.from(
    new Set(log.map(entry => new Date(entry.date).setHours(0, 0, 0, 0))),
  ).sort((a, b) => b - a);

  if (uniqueDays.length === 0) {
    return 0;
  }

  const today = new Date(now).setHours(0, 0, 0, 0);
  const yesterday = today - DAY;
  const mostRecentDay = uniqueDays[0];

  if (mostRecentDay !== today && mostRecentDay !== yesterday) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    if (uniqueDays[i - 1] - uniqueDays[i] === DAY) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
