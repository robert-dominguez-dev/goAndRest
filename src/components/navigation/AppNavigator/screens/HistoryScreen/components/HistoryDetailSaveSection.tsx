import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { AppInput } from '../../../../../controls/AppInput/AppInput.tsx';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { getWorkoutNameRules } from '../../../../../controls/helpers/getWorkoutNameRules.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { workoutHistoryAtom } from '../../../../../../contexts/atoms.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';

type HistoryDetailSaveSectionProps = {
  entry: WorkoutHistoryEntry;
};

type SaveWorkoutFormValues = {
  workoutName: string;
};

const HistoryDetailSaveSectionComponent = ({
  entry,
}: HistoryDetailSaveSectionProps) => {
  const t = useAppTranslation();

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

  if (!entry.config || alreadySaved || justSaved) {
    return null;
  }

  const config = entry.config;

  const handleSave = handleSubmit(({ workoutName }) => {
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

  return (
    <AppView gap={'m'}>
      <AppDivider />
      <AppInput
        name={'workoutName'}
        control={control}
        rules={getWorkoutNameRules(t)}
        label={t('screens.landingScreen.saveWorkoutBottomSheet.inputLabel')}
      />
      <AppButton
        label={t('screens.historyScreen.detailSave')}
        onPress={handleSave}
        iconName={'Save'}
        backgroundColorStatus={'primary'}
        disabled={!formState.isValid}
      />
    </AppView>
  );
};

export const HistoryDetailSaveSection = memo(HistoryDetailSaveSectionComponent);
