import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { WorkoutConfigBottomSheetContentBase } from './WorkoutConfigBottomSheetContentBase.tsx';
import { LocalWorkoutConfigFormValues } from '../../../types.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

type WorkoutConfigBottomSheetContentProps = {
  name: AppWorkoutConfigKey;
  control: Control<LocalWorkoutConfigFormValues>;
};

const WorkoutConfigBottomSheetContentComponent = ({
  name,
  control,
}: WorkoutConfigBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { getValues } = useFormContext<AppWorkoutFieldValues>();

  const { descriptionKey, min, max, step, labelEveryNSteps, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  return (
    <Controller
      control={control}
      name={'configValue'}
      defaultValue={getValues(name)}
      shouldUnregister
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
