import { useMemo, useRef, useState } from 'react';
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

  const secRef = useRef(
    Math.max(
      0,
      Math.round(
        (dateRef.current - getNumber(finishedWorkoutStats?.startedAt)) / 1000,
      ),
    ),
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

  return {
    sec: secRef.current,
    rpe,
    setRpe,
    streak,
    weekVolumeStats,
    commit,
  };
};
