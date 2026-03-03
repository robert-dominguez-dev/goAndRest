import { RotateCcw } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useFormState } from 'react-hook-form';
import { useResetWorkoutPopUp } from '../hooks/useResetWorkoutPopUp.tsx';

export const ResetDefaultButton = () => {
  const { popUp, openResetWorkoutPopUp } = useResetWorkoutPopUp();

  const { isDirty } = useFormState();

  const { text } = useAppThemedColors();

  return (
    <>
      <AppRoundedButton
        onPress={openResetWorkoutPopUp}
        size={'s'}
        status={'grayscale'}
        disabled={!isDirty}>
        <RotateCcw
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {popUp}
    </>
  );
};
