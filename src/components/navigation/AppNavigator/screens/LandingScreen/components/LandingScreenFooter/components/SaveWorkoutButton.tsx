import { Save } from 'lucide-react-native';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppSize } from '../../../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../../../hooks/useAppThemedColors.ts';
import { useSaveWorkoutBottomSheet } from '../hooks/useSaveWorkoutBottomSheet.tsx';

export const SaveWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { bottomSheet, openSaveWorkoutBottomSheet } =
    useSaveWorkoutBottomSheet();

  return (
    <>
      <AppRoundedButton
        onPress={openSaveWorkoutBottomSheet}
        size={'s'}
        status={'grayscale'}>
        <Save
          size={AppSize.ml}
          color={text}
        />
      </AppRoundedButton>
      {bottomSheet}
    </>
  );
};
