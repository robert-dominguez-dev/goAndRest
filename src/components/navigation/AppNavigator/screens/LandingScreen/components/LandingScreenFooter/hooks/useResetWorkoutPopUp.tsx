import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppPopUp } from '../../../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { useAtom, useSetAtom } from 'jotai';
import {
  heldWorkoutIdentityAtom,
  lastDefaultWorkoutConfigAtom,
} from '../../../../../../../../contexts/atoms.ts';
import { useAppWorkouts } from '../../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { checkIsHeldWorkoutConfig } from '../../../../../../../../contexts/AppWorkoutsProvider/helpers/checkIsHeldWorkoutConfig.ts';

export const useResetWorkoutPopUp = () => {
  const t = useAppTranslation();

  const setLastDefaultWorkoutConfig = useSetAtom(lastDefaultWorkoutConfigAtom);
  const [heldWorkoutIdentity, setHeldWorkoutIdentity] = useAtom(
    heldWorkoutIdentityAtom,
  );

  const { storedWorkouts } = useAppWorkouts();

  const { reset } = useFormContext<AppWorkoutFieldValues>();

  const { popUp, onOpen } = useAppPopUp({
    title: t('screens.landingScreen.resetWorkoutPopUp.title'),
    iconName: 'RotateCcw',
    description: t('screens.landingScreen.resetWorkoutPopUp.description'),
    primaryButtonProps: {
      label: t('screens.landingScreen.resetWorkoutPopUp.positiveButtonLabel'),
      onPress: () => {
        void setLastDefaultWorkoutConfig(defaultWorkoutConfig);

        if (
          !checkIsHeldWorkoutConfig(
            heldWorkoutIdentity,
            defaultWorkoutConfig,
            storedWorkouts,
          )
        ) {
          void setHeldWorkoutIdentity(null);
        }

        reset(defaultWorkoutConfig);
      },
      backgroundColorStatus: 'negative',
    },
    secondaryButtonProps: {
      label: t('screens.landingScreen.resetWorkoutPopUp.negativeButtonLabel'),
      backgroundColorStatus: 'backgroundAlt',
    },
  });

  return { popUp, openResetWorkoutPopUp: onOpen };
};
