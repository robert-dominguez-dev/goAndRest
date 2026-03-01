import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, Controller } from 'react-hook-form';
import { memo } from 'react';
import { WorkoutConfigBottomSheetContentBase } from './WorkoutConfigBottomSheetContentBase.tsx';

type WorkoutConfigBottomSheetContentProps = {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkoutFieldValues>;
};

const WorkoutConfigBottomSheetContentComponent = ({
  name,
  control,
}: WorkoutConfigBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { descriptionKey, min, max, step, labelEveryNSteps, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <WorkoutConfigBottomSheetContentBase
          description={t(descriptionKey)}
          value={field.value}
          onChange={field.onChange}
          minValue={min}
          maxValue={max}
          step={step}
          labelEveryNSteps={labelEveryNSteps}
          valueFormatter={valueFormatter}
        />
      )}
    />
  );
};

export const WorkoutConfigBottomSheetContent = memo(
  WorkoutConfigBottomSheetContentComponent,
);
