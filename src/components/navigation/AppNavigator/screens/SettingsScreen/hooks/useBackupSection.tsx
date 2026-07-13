import { Fragment, JSX } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useIsPremium } from '../../../../../../contexts/premium/hooks/useIsPremium.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { workoutHistoryAtom } from '../../../../../../contexts/atoms.ts';
import { useAppBottomSheet } from '../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import { useAppPopUp } from '../../../../../common/AppPopUp/hooks/useAppPopUp.tsx';
import { useAppFullScreenLoader } from '../../../../../../contexts/AppFullScreenLoaderProvider/AppFullScreenLoaderProvider.tsx';
import { RestoreBackupBottomSheetContent } from '../components/RestoreBackupBottomSheetContent.tsx';
import { BackupDataSettingItem } from '../components/items/BackupDataSettingItem.tsx';
import { RestoreDataSettingItem } from '../components/items/RestoreDataSettingItem.tsx';
import {
  exportBackup,
  pickAndParseBackup,
} from '../../../../../../services/backupService.ts';
import { ParsedBackup } from '../../../../../../services/helpers/parseBackup.ts';

type UseBackupSectionParams = {
  onPremiumRequired: () => void;
};

export const useBackupSection = ({
  onPremiumRequired,
}: UseBackupSectionParams) => {
  const t = useAppTranslation();

  const { showFullScreenLoader, hideFullScreenLoader } =
    useAppFullScreenLoader();

  const isPremium = useIsPremium();

  const { storedWorkouts, replaceAllWorkouts } = useAppWorkouts();
  const log = useAtomValue(workoutHistoryAtom);
  const setLog = useSetAtom(workoutHistoryAtom);

  const {
    bottomSheet: restoreBottomSheet,
    handleOpen,
    handleClose,
  } = useAppBottomSheet();

  const { popUp: invalidBackupPopUp, onOpen: openInvalidBackupPopUp } =
    useAppPopUp({
      title: t(
        'screens.settingsScreen.backupSection.restoreSheet.invalidPopUp.title',
      ),
      description: t(
        'screens.settingsScreen.backupSection.restoreSheet.invalidPopUp.description',
      ),
      primaryButtonProps: { label: t('common.ok') },
    });

  const openRestoreBottomSheet = (payload: ParsedBackup) => {
    const handleConfirm = () => {
      replaceAllWorkouts(payload.workouts);
      void setLog(payload.log);
      handleClose();
    };

    const renderContent: AppBottomSheetProps['renderContent'] = () => (
      <RestoreBackupBottomSheetContent
        payload={payload}
        onConfirm={handleConfirm}
      />
    );

    handleOpen({
      renderContent,
      title: t('screens.settingsScreen.backupSection.restoreSheet.title'),
      backgroundColorStatus: 'backgroundAlt',
      accessoryRightIconName: 'X',
      onAccessoryRightPress: handleClose,
    });
  };

  const handleExportPress = async () => {
    if (!isPremium) {
      onPremiumRequired();
      return;
    }

    showFullScreenLoader(t('common.loader.exportingBackup'));
    try {
      await exportBackup(storedWorkouts, log);
    } finally {
      hideFullScreenLoader();
    }
  };

  const handleImportPress = async () => {
    if (!isPremium) {
      onPremiumRequired();
      return;
    }

    let result: Awaited<ReturnType<typeof pickAndParseBackup>>;

    showFullScreenLoader(t('common.loader.importingBackup'));
    try {
      result = await pickAndParseBackup();
    } finally {
      hideFullScreenLoader();
    }

    if (result === 'cancelled') {
      return;
    }

    if (result === 'invalid') {
      openInvalidBackupPopUp();
      return;
    }

    openRestoreBottomSheet(result.payload);
  };

  const items: JSX.Element[] = [
    <BackupDataSettingItem
      key={'backup'}
      isPremium={isPremium}
      onPress={() => void handleExportPress()}
    />,
    <RestoreDataSettingItem
      key={'restore'}
      isPremium={isPremium}
      onPress={() => void handleImportPress()}
    />,
  ];

  const sheets = (
    <Fragment>
      {restoreBottomSheet}
      {invalidBackupPopUp}
    </Fragment>
  );

  return { items, sheets };
};
