import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ArrowLeft } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { SavedWorkoutItem } from './components/SavedWorkoutItem.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { useAppPopUp } from '../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { AppStoredWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';

type SavedWorkoutsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SavedWorkoutsScreen
>;

export const SavedWorkoutsScreen = ({
  navigation,
}: SavedWorkoutsScreenProps) => {
  const t = useAppTranslation();

  const { storedWorkouts, removeWorkout, setRunningWorkout } = useAppWorkouts();

  const { popUp, handleOpen } = useAppPopUp();

  const handleDeleteWorkout = (workout: AppStoredWorkout): void =>
    handleOpen({
      title: t('screens.landingScreen.removeStoredWorkoutPopUp.title'),
      description: t(
        'screens.landingScreen.removeStoredWorkoutPopUp.description',
        { value: workout.meta.name },
      ),
      primaryButtonProps: {
        label: t(
          'screens.landingScreen.removeStoredWorkoutPopUp.positiveButtonLabel',
        ),
        onPress: () => removeWorkout(workout.id),
        backgroundColorStatus: 'negative',
      },
      secondaryButtonProps: {
        label: t(
          'screens.landingScreen.removeStoredWorkoutPopUp.negativeButtonLabel',
        ),
        backgroundColorStatus: 'backgroundAlt',
      },
    });

  const handleStartWorkout = ({ config, meta: { name } }: AppStoredWorkout) => {
    setRunningWorkout({ name, ...config });
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);
  };

  const storedWorkoutItemElements = storedWorkouts.map(workout => (
    <SavedWorkoutItem
      key={workout.id}
      workout={workout}
      onStart={handleStartWorkout}
      onDelete={handleDeleteWorkout}
    />
  ));

  return (
    <>
      <AppScreenLayout
        scrollable
        headerTitle={t('screens.savedWorkoutsScreen.title')}
        HeaderAccessoryLeftIconComponent={ArrowLeft}
        onHeaderAccessoryLeftPress={navigation.goBack}>
        <AppView gap={'sm'}>{storedWorkoutItemElements}</AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
