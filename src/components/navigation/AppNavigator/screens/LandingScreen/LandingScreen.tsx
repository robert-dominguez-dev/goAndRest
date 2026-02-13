import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Menu } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { WorkoutConfigButtons } from './components/WorkoutConfigButtons.tsx';
import { AppView } from '../../../../common/AppView.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { LandingScreenFooter } from './components/LandingScreenFooter.tsx';
import { WorkoutButtons } from './components/WorkoutButtons.tsx';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';

const footerElement = <LandingScreenFooter />;

type LandingScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.LandingScreen
>;

export const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const t = useAppTranslation();

  const { workouts, selectedWorkout } = useAppWorkouts();

  const goToSettings = () =>
    navigation.navigate(AppNavigatorScreen.SettingsScreen);

  const headerTitle: string =
    selectedWorkout?.meta.name || t('screens.landingScreen.title');

  return (
    <AppScreenLayout
      headerTitle={headerTitle}
      HeaderAccessoryLeftIconComponent={Menu}
      onHeaderAccessoryLeftPress={goToSettings}
      footer={footerElement}>
      <AppView
        grow
        gap={'l'}>
        {!!workouts.length && <WorkoutButtons workouts={workouts} />}
        <AppView
          grow
          alignItems={'center'}
          justifyContent={'center'}>
          <AppTimeView seconds={90} />
        </AppView>
        <WorkoutConfigButtons />
      </AppView>
    </AppScreenLayout>
  );
};
