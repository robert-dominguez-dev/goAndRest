import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, useWatch } from 'react-hook-form';

type WorkoutConfigButtonProps = {
  control: Control<AppWorkout>;
  name: AppWorkoutConfigKey;
};

const _WorkoutConfigButton = ({ control, name }: WorkoutConfigButtonProps) => {
  const t = useAppTranslation();

  const value = useWatch({
    control,
    name,
  });

  const { labelKey, backgroundColorStatus, IconComponent, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const label = t(labelKey);

  const valueFormatted = valueFormatter(value);

  const handlePress = () => console.log(name);

  return (
    <AppButton
      label={label}
      value={valueFormatted}
      backgroundColorStatus={backgroundColorStatus}
      IconComponent={IconComponent}
      onPress={handlePress}
    />
  );
};

export const WorkoutConfigButton = memo(_WorkoutConfigButton);
