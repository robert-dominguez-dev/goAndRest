import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useDeleteWorkoutPopUp } from './hooks/useDeleteWorkoutPopUp.ts';
import { SavedWorkoutItems } from './components/SavedWorkoutItems.tsx';

type SavedWorkoutsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SavedWorkoutsScreen
>;

export const SavedWorkoutsScreen = ({
  navigation,
}: SavedWorkoutsScreenProps) => {
  const t = useAppTranslation();

  const { popUp, handleDeleteWorkout } = useDeleteWorkoutPopUp();

  return (
    <>
      <AppScreenLayout
        scrollable
        headerTitle={t('screens.savedWorkoutsScreen.title')}
        headerAccessoryLeftIconName={'ArrowLeft'}
        onHeaderAccessoryLeftPress={navigation.goBack}>
        <SavedWorkoutItems onDeleteWorkout={handleDeleteWorkout} />
      </AppScreenLayout>
      {popUp}
    </>
  );
};
