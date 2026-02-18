import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/constants.ts';

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const { runningWorkout } = useAppWorkouts();

  const selectedWorkoutConfig: AppWorkoutConfig =
    runningWorkout || defaultWorkoutConfig;

  const headerTitle: string =
    runningWorkout?.workoutName || t('screens.runningWorkoutScreen.title');

  return (
    <AppScreenLayout
      headerTitle={headerTitle}
      HeaderAccessoryLeftIconComponent={X}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppView>
        {Object.entries(selectedWorkoutConfig).map(([key, value]) => (
          <AppText key={key}>
            {key}: {value}
          </AppText>
        ))}
      </AppView>
    </AppScreenLayout>
  );
};
