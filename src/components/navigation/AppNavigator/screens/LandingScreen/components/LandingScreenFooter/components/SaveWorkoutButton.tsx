import { AppIcon } from '../../../../../../../common/AppIcon.tsx';
import { AppRoundedButton } from '../../../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useSaveWorkoutBottomSheet } from '../hooks/useSaveWorkoutBottomSheet.tsx';

export const SaveWorkoutButton = () => {
  const { bottomSheet, openSaveWorkoutBottomSheet } =
    useSaveWorkoutBottomSheet();

  return (
    <>
      <AppRoundedButton
        onPress={openSaveWorkoutBottomSheet}
        size={'s'}
        status={'grayscale'}>
        <AppIcon name={'Save'} />
      </AppRoundedButton>
      {bottomSheet}
    </>
  );
};
