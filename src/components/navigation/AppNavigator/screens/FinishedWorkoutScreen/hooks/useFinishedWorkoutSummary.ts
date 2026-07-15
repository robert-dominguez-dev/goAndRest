import { useEffect, useMemo, useRef, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import {
  finishedWorkoutStatsAtom,
  workoutHistoryAtom,
} from '../../../../../../contexts/atoms.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';
import { computeStreak } from '../../../../../../helpers/computeStreak.ts';
import { weekVolume } from '../../../../../../helpers/weekVolume.ts';
import { addWorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/helpers/addWorkoutHistoryEntry.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import type { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';

export const useFinishedWorkoutSummary = () => {
  const finishedWorkoutStats = useAtomValue(finishedWorkoutStatsAtom);
  const currentLog = useAtomValue(workoutHistoryAtom);
  const setWorkoutHistory = useSetAtom(workoutHistoryAtom);

  const idRef = useRef(uuidv4());
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

  const [isRpePopupOpen, setIsRpePopupOpen] = useState(true);

  const session: WorkoutHistoryEntry = useMemo(() => {
    const runningConfig = finishedWorkoutStats?.workoutConfig;

    const config: AppWorkoutConfig | undefined = runningConfig && {
      work: runningConfig.work,
      rest: runningConfig.rest,
      series: runningConfig.series,
      rounds: runningConfig.rounds,
      recovery: runningConfig.recovery,
    };

    return {
      id: idRef.current,
      date: dateRef.current,
      sec: secRef.current,
      rounds,
      rpe,
      config,
      name: finishedWorkoutStats?.workoutName || undefined,
      savedWorkoutId: finishedWorkoutStats?.savedWorkoutId,
    };
  }, [rounds, rpe, finishedWorkoutStats]);

  const projectedLog = useMemo(
    () => [session, ...currentLog],
    [session, currentLog],
  );

  const streak = computeStreak(projectedLog);
  const weekVolumeStats = weekVolume(projectedLog);

  // Upsert by id: the first commit records the entry, later commits (e.g. a
  // corrected difficulty) update the same entry instead of duplicating it.
  const commit = () => {
    const alreadyLogged = currentLog.some(entry => entry.id === session.id);

    const nextLog = alreadyLogged
      ? currentLog.map(entry => (entry.id === session.id ? session : entry))
      : addWorkoutHistoryEntry(currentLog, session);

    void setWorkoutHistory(nextLog);
  };

  const selectRpe = (value: number) => {
    setRpe(value);
    setIsRpePopupOpen(false);
  };

  const openRpePopup = () => setIsRpePopupOpen(true);

  const closeRpePopup = () => setIsRpePopupOpen(false);

  // Persist as soon as a difficulty is picked (or corrected), so the entry is
  // recorded even if the user then leaves via the system back button instead
  // of the Finish / History actions.
  useEffect(() => {
    if (rpe !== null) {
      commit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpe]);

  return {
    sec: secRef.current,
    rpe,
    selectRpe,
    isRpePopupOpen,
    openRpePopup,
    closeRpePopup,
    streak,
    weekVolumeStats,
    commit,
  };
};
