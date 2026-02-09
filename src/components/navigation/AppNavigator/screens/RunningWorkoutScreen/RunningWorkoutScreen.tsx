import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { useEffect } from 'react';
import { AppView } from '../../../../common/AppView.tsx';
import { AppWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/constants.ts';

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const { selectedWorkout, startWorkout, isRunning } = useAppWorkouts();

  const selectedWorkoutConfig: AppWorkout =
    selectedWorkout || defaultWorkoutConfig;

  useEffect(() => {
    if (!isRunning) {
      startWorkout();
    }
  }, []);

  const headerTitle: string =
    selectedWorkoutConfig.meta.name || t('screens.runningWorkoutScreen.title');

  return (
    <AppScreenLayout
      headerTitle={headerTitle}
      HeaderAccessoryLeftIconComponent={X}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppView>
        {Object.entries(selectedWorkoutConfig.config).map(([key, value]) => (
          <AppText key={key}>
            {key}: {value}
          </AppText>
        ))}
      </AppView>
    </AppScreenLayout>
  );
};
