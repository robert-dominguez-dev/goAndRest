import { useAppBottomSheet } from '../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryDetailBottomSheetContent } from '../HistoryDetailBottomSheetContent.tsx';
import { formatHistoryDetailDate } from '../helpers/formatHistoryDate.ts';

export const useHistoryDetailBottomSheet = () => {
  const { language } = useAppLanguage();

  const { bottomSheet, handleOpen, handleClose } = useAppBottomSheet();

  const openHistoryDetailBottomSheet = (entry: WorkoutHistoryEntry) => {
    const renderContent: AppBottomSheetProps['renderContent'] = () => (
      <HistoryDetailBottomSheetContent entry={entry} />
    );

    handleOpen({
      renderContent,
      title: formatHistoryDetailDate(entry.date, language),
      backgroundColorStatus: 'backgroundAlt',
      accessoryRightIconName: 'X',
      onAccessoryRightPress: handleClose,
    });
  };

  return { bottomSheet, openHistoryDetailBottomSheet };
};
