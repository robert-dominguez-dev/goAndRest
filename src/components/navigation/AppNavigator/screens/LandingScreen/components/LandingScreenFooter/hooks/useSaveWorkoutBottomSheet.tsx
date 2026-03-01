import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppBottomSheet } from '../../../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { SaveWorkoutBottomSheetContent } from '../components/SaveWorkoutBottomSheetContent.tsx';
import { X } from 'lucide-react-native';

export const useSaveWorkoutBottomSheet = () => {
  const t = useAppTranslation();

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <SaveWorkoutBottomSheetContent onClose={onClose} />
  );

  const { bottomSheet, handleOpen, handleClose } = useAppBottomSheet();

  const openSaveWorkoutBottomSheet = () =>
    handleOpen({
      renderContent,
      title: t('screens.landingScreen.saveWorkoutBottomSheet.title'),
      backgroundColorStatus: 'backgroundAlt',
      AccessoryRightIconComponent: X,
      onAccessoryRightPress: handleClose,
    });

  return { bottomSheet, openSaveWorkoutBottomSheet };
};
