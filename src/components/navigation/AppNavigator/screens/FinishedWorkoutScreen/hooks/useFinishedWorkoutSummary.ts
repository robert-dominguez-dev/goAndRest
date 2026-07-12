import { useEffect, useMemo, useRef, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  finishedWorkoutStatsAtom,
  workoutHistoryAtom,
} from '../../../../../../contexts/atoms.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';
import { computeStreak } from '../../../../../../helpers/computeStreak.ts';
import { weekVolume } from '../../../../../../helpers/weekVolume.ts';
import { addWorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/helpers/addWorkoutHistoryEntry.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';

export const useFinishedWorkoutSummary = () => {
  const finishedWorkoutStats = useAtomValue(finishedWorkoutStatsAtom);
  const currentLog = useAtomValue(workoutHistoryAtom);
  const setWorkoutHistory = useSetAtom(workoutHistoryAtom);

  const dateRef = useRef(Date.now());

  const startedAt = getNumber(finishedWorkoutStats?.startedAt);

  // Guard against a missing `startedAt` (would otherwise yield the current
  // unix time in seconds - billions - and persist it into the history).
  const secRef = useRef(
    startedAt > 0
      ? Math.max(0, Math.round((dateRef.current - startedAt) / 1000))
      : 0,
  );

  const rounds = getNumber(finishedWorkoutStats?.workoutConfig.rounds);

  const [rpe, setRpe] = useState<number | null>(null);

  const committedRef = useRef(false);

  const session: WorkoutHistoryEntry = useMemo(
    () => ({
      date: dateRef.current,
      sec: secRef.current,
      rounds,
      rpe,
    }),
    [rounds, rpe],
  );

  const projectedLog = useMemo(
    () => [session, ...currentLog],
    [session, currentLog],
  );

  const streak = computeStreak(projectedLog);
  const weekVolumeStats = weekVolume(projectedLog);

  const commit = () => {
    if (committedRef.current) {
      return;
    }

    committedRef.current = true;

    void setWorkoutHistory(addWorkoutHistoryEntry(currentLog, session));
  };

  // The rating popup is the last mandatory step, so persist the workout as
  // soon as a difficulty is picked. This guarantees the entry is recorded
  // even if the user then leaves via the system back button instead of the
  // Finish / History actions.
  useEffect(() => {
    if (rpe !== null) {
      commit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpe]);

  return {
    sec: secRef.current,
    rpe,
    setRpe,
    streak,
    weekVolumeStats,
    commit,
  };
};
