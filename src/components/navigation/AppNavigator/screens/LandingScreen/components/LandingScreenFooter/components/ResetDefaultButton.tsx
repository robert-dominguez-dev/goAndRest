import { RotateCcw } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useFormContext, useWatch } from 'react-hook-form';
import { useResetWorkoutPopUp } from '../hooks/useResetWorkoutPopUp.tsx';
import { checkIsDefaultWorkoutConfig } from '../../../../../../../../helpers/checkIsDefaultWorkoutConfig.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';

export const ResetDefaultButton = () => {
  const { popUp, openResetWorkoutPopUp } = useResetWorkoutPopUp();

  const { getValues } = useFormContext<AppWorkoutFieldValues>();

  const workoutConfig = useWatch<AppWorkoutFieldValues>();

  const isDefaultWorkoutConfig = checkIsDefaultWorkoutConfig({
    ...workoutConfig,
    ...getValues(),
  });

  const { text } = useAppThemedColors();

  return (
    <>
      <AppRoundedButton
        onPress={openResetWorkoutPopUp}
        size={'s'}
        status={'grayscale'}
        disabled={isDefaultWorkoutConfig}>
        <RotateCcw
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {popUp}
    </>
  );
};
