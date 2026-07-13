import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { SaveWorkoutBottomSheetContent } from '../components/SaveWorkoutBottomSheetContent.tsx';

export const useSaveWorkoutBottomSheet = (
  onSave?: (values: AppWorkoutFieldValues) => void,
) => {
  const t = useAppTranslation();

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <SaveWorkoutBottomSheetContent
      onClose={onClose}
      onSave={onSave}
    />
  );

  const { bottomSheet, handleOpen, handleClose } = useAppBottomSheet();

  const openSaveWorkoutBottomSheet = () =>
    handleOpen({
      renderContent,
      title: t('screens.landingScreen.saveWorkoutBottomSheet.title'),
      backgroundColorStatus: 'backgroundAlt',
      accessoryRightIconName: 'X',
      onAccessoryRightPress: handleClose,
    });

  return { bottomSheet, openSaveWorkoutBottomSheet };
};
