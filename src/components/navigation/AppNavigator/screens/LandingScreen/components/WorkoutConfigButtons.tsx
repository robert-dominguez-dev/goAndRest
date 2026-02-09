import { AppView } from '../../../../../common/AppView.tsx';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import {
  appWorkoutConfigKeys,
  workoutSettingsButtonConfigMap,
} from '../constants.ts';
import { JSX, memo } from 'react';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/constants.ts';

const _WorkoutConfigButtons = () => {
  const t = useAppTranslation();

  const { selectedWorkout } = useAppWorkouts();

  const selectedWorkoutConfig: AppWorkout =
    selectedWorkout || defaultWorkoutConfig;

  const workoutConfigButtonElements = appWorkoutConfigKeys.map<JSX.Element>(
    key => {
      const { labelKey, backgroundColorStatus, IconComponent, valueFormatter } =
        workoutSettingsButtonConfigMap[key];

      const label = t(labelKey);
      const value = valueFormatter(selectedWorkoutConfig.config[key]);

      const handlePress = () => console.log(key);

      return (
        <AppButton
          key={key}
          label={label}
          value={value}
          backgroundColorStatus={backgroundColorStatus}
          IconComponent={IconComponent}
          onPress={handlePress}
        />
      );
    },
  );

  return <AppView gap={'s'}>{workoutConfigButtonElements}</AppView>;
};

export const WorkoutConfigButtons = memo(_WorkoutConfigButtons);
