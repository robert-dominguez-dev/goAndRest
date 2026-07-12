import { differenceInCalendarDays } from 'date-fns';
import { WorkoutHistoryEntry } from '../contexts/workoutHistory/types.ts';

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

  // Calendar-day math (not fixed 24h subtraction) so the streak survives
  // daylight-saving transitions, where consecutive local midnights are 23
  // or 25 hours apart.
  const daysSinceMostRecent = differenceInCalendarDays(now, uniqueDays[0]);

  if (daysSinceMostRecent < 0 || daysSinceMostRecent > 1) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    if (differenceInCalendarDays(uniqueDays[i - 1], uniqueDays[i]) === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
