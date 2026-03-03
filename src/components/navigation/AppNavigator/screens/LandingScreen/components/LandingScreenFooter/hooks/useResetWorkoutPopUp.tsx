import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

export const useResetWorkoutPopUp = () => {
  const t = useAppTranslation();

  const { reset } = useFormContext<AppWorkoutFieldValues>();

  const { popUp, onOpen } = useAppPopUp({
    title: t('screens.landingScreen.resetWorkoutPopUp.title'),
    description: t('screens.landingScreen.resetWorkoutPopUp.description'),
    primaryButtonProps: {
      label: t('screens.landingScreen.resetWorkoutPopUp.positiveButtonLabel'),
      onPress: () => reset(),
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: t('screens.landingScreen.resetWorkoutPopUp.negativeButtonLabel'),
      backgroundColorStatus: 'backgroundAlt',
    },
  });

  return { popUp, openResetWorkoutPopUp: onOpen };
};
