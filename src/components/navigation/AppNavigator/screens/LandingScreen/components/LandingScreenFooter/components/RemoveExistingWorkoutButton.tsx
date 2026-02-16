import { Trash } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useAppPopUp } from '../../../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';

type DeleteExistingWorkoutButtonProps = {
  onRemove: () => void;
  workoutName: string;
};

export const RemoveExistingWorkoutButton = ({
  onRemove,
  workoutName,
}: DeleteExistingWorkoutButtonProps) => {
  const t = useAppTranslation();

  const { text } = useAppThemedColors();

  const { popUpElement, onOpen } = useAppPopUp({
    title: t('screens.landingScreen.removeStoredWorkoutPopUp.title'),
    description: t(
      'screens.landingScreen.removeStoredWorkoutPopUp.description',
      { value: workoutName },
    ),
    primaryButtonProps: {
      label: t(
        'screens.landingScreen.removeStoredWorkoutPopUp.positiveButtonLabel',
      ),
      onPress: onRemove,
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: t(
        'screens.landingScreen.removeStoredWorkoutPopUp.negativeButtonLabel',
      ),
      backgroundColorStatus: 'backgroundAlt',
    },
  });

  return (
    <>
      <AppRoundedButton
        onPress={onOpen}
        size={'s'}
        status={'negative'}>
        <Trash
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {popUpElement}
    </>
  );
};
