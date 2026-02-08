import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const t = useAppTranslation();

  const { selectedWorkout } = useAppWorkouts();

  const headerTitle: string =
    selectedWorkout.meta.name || t('screens.runningWorkoutScreen.title');

  return (
    <AppScreenLayout
      headerTitle={headerTitle}
      HeaderAccessoryLeftIconComponent={X}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppText>JOJOJOJ</AppText>
    </AppScreenLayout>
  );
};
