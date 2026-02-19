import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { X } from 'lucide-react-native';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { RunningWorkoutScreenFooter } from './components/RunningWorkoutScreenFooter.tsx';
import { useEndRunningWorkoutPopUp } from './hooks/useEndRunningWorkoutPopUp.tsx';

const footerElement = <RunningWorkoutScreenFooter />;

export const RunningWorkoutScreen = () => {
  const t = useAppTranslation();

  const { runningWorkout } = useAppWorkouts();

  const selectedWorkoutConfig: AppWorkoutConfig =
    runningWorkout || defaultWorkoutConfig;

  const headerTitle: string =
    runningWorkout?.workoutName || t('screens.runningWorkoutScreen.title');

  const { popUp, handleEndWorkout } = useEndRunningWorkoutPopUp();

  return (
    <>
      <AppScreenLayout
        headerTitle={headerTitle}
        footer={footerElement}
        HeaderAccessoryLeftIconComponent={X}
        onHeaderAccessoryLeftPress={handleEndWorkout}>
        <AppView>
          {Object.entries(selectedWorkoutConfig).map(([key, value]) => (
            <AppText key={key}>
              {key}: {value}
            </AppText>
          ))}
        </AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
