import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { workoutHistoryAtom } from '../../../../../../contexts/atoms.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';

type SaveWorkoutFormValues = {
  workoutName: string;
};

export const useHistoryDetailSave = (entry: WorkoutHistoryEntry) => {
  const { storedWorkouts, storeWorkout } = useAppWorkouts();

  const log = useAtomValue(workoutHistoryAtom);
  const setWorkoutHistory = useSetAtom(workoutHistoryAtom);

  const [justSaved, setJustSaved] = useState(false);

  const { control, handleSubmit, formState } = useForm<SaveWorkoutFormValues>({
    defaultValues: { workoutName: entry.name ?? '' },
    mode: 'onChange',
  });

  const alreadySaved =
    !!entry.config &&
    storedWorkouts.some(workout => workout.id === entry.savedWorkoutId);

  const canSave = !!entry.config && !alreadySaved && !justSaved;

  const handleSave = handleSubmit(({ workoutName }) => {
    if (!entry.config) {
      return;
    }

    const config = entry.config;
    const newId = uuidv4();

    storeWorkout({
      id: newId,
      meta: { name: workoutName, createdAt: new Date() },
      config,
    });

    setWorkoutHistory(
      log.map(historyEntry =>
        historyEntry.date === entry.date
          ? { ...historyEntry, savedWorkoutId: newId, name: workoutName }
          : historyEntry,
      ),
    );

    setJustSaved(true);
  });

  return { control, formState, handleSave, canSave };
};
