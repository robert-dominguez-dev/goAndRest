import {
  AppWorkoutConfigKey,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { memo } from 'react';
import {
  AppButton,
  AppButtonProps,
} from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { Control, useWatch } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';

export type WorkoutConfigButtonBaseProps = Pick<AppButtonProps, 'disabled'> & {
  control: Control<AppWorkout>;
  name: AppWorkoutConfigKey;
  onPress: () => void;
};

const WorkoutConfigButtonBaseComponent = ({
  control,
  name,
  onPress,
  disabled,
}: WorkoutConfigButtonBaseProps) => {
  const t = useAppTranslation();

  const value = useWatch({
    control,
    name,
  });

  const { labelKey, backgroundColorStatus, IconComponent, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  return (
    <AppButton
      label={t(labelKey)}
      value={formattedValue}
      backgroundColorStatus={backgroundColorStatus}
      IconComponent={IconComponent}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export const WorkoutConfigButtonBase = memo(WorkoutConfigButtonBaseComponent);
