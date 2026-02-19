import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../../../constants.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, Controller } from 'react-hook-form';
import { AppBottomSheetRenderContentProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { memo } from 'react';
import { WorkoutConfigBottomSheetContentBase } from './WorkoutConfigBottomSheetContentBase.tsx';

type WorkoutConfigBottomSheetContentProps = AppBottomSheetRenderContentProps & {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkout>;
  onConfirm: () => void;
};

const WorkoutConfigBottomSheetContentComponent = ({
  name,
  control,
  onConfirm,
  onClose,
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
          onConfirm={onConfirm}
          onClose={onClose}
        />
      )}
    />
  );
};

export const WorkoutConfigBottomSheetContent = memo(
  WorkoutConfigBottomSheetContentComponent,
);
