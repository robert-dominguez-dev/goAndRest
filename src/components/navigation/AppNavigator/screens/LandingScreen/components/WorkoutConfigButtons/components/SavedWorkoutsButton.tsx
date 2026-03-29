import { memo } from 'react';
import { useRootStackNavigation } from '../../../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../../../types.ts';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { AppDottedButton } from '../../../../../../../common/AppDottedButton.tsx';

const SavedWorkoutsButtonComponent = () => {
  const t = useAppTranslation();

  const navigation = useRootStackNavigation();

  const goToSavedWorkouts = () =>
    navigation.navigate(AppNavigatorScreen.SavedWorkoutsScreen);

  return (
    <AppDottedButton
      label={t('screens.landingScreen.selectStoredWorkoutButtonLabel')}
      onPress={goToSavedWorkouts}
      accessoryLeftIconName={'SaveAll'}
      accessoryRightIconName={'ArrowRight'}
    />
  );
};

export const SavedWorkoutsButton = memo(SavedWorkoutsButtonComponent);
