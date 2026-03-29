import { AppIcon } from '../../../../../../../common/AppIcon.tsx';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
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

  return (
    <>
      <AppRoundedButton
        onPress={openResetWorkoutPopUp}
        size={'s'}
        status={'grayscale'}
        disabled={isDefaultWorkoutConfig}>
        <AppIcon name={'RotateCcw'} />
      </AppRoundedButton>
      {popUp}
    </>
  );
};
