import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ArrowLeft } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { SavedWorkoutItem } from './components/SavedWorkoutItem.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppStoredWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useDeleteWorkoutPopUp } from './hooks/useDeleteWorkoutPopUp.ts';

type SavedWorkoutsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SavedWorkoutsScreen
>;

export const SavedWorkoutsScreen = ({
  navigation,
}: SavedWorkoutsScreenProps) => {
  const t = useAppTranslation();

  const { storedWorkouts, setRunningWorkout } = useAppWorkouts();

  const { popUp, handleDeleteWorkout } = useDeleteWorkoutPopUp();

  const handleStartWorkout = ({ config, meta: { name } }: AppStoredWorkout) => {
    setRunningWorkout({ workoutName: name, ...config });
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
        <AppView gap={'m'}>{storedWorkoutItemElements}</AppView>
      </AppScreenLayout>
      {popUp}
    </>
  );
};
