import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppHint } from '../../../../../common/AppHint.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { DASH } from '../../../../../../constants/common.ts';
import { formatBackupRestorationDate } from '../../HistoryScreen/helpers/formatHistoryDate.ts';
import { ParsedBackup } from '../../../../../../services/helpers/parseBackup.ts';

type RestoreBackupBottomSheetContentProps = {
  payload: ParsedBackup;
  onConfirm: () => void;
};

type RestoreInfoRowProps = {
  label: string;
  value: string;
};

const RestoreInfoRow = ({ label, value }: RestoreInfoRowProps) => (
  <AppRow
    justifyContent={'space-between'}
    alignItems={'center'}
    gap={'m'}
    paddingVertical={'s'}>
    <AppText
      category={'contentBold'}
      colorStatus={'textMuted'}>
      {label}
    </AppText>
    <AppText
      grow={false}
      category={'title'}>
      {value}
    </AppText>
  </AppRow>
);

const RestoreBackupBottomSheetContentComponent = ({
  payload,
  onConfirm,
}: RestoreBackupBottomSheetContentProps) => {
  const t = useAppTranslation();

  const { language } = useAppLanguage();

  const dates = payload.log.map(entry => entry.date).sort((a, b) => a - b);

  const period = dates.length
    ? dates.length > 1
      ? `${formatBackupRestorationDate(
          dates[0],
          language,
        )} – ${formatBackupRestorationDate(dates[dates.length - 1], language)}`
      : formatBackupRestorationDate(dates[0], language)
    : DASH;

  return (
    <AppView gap={'m'}>
      <AppHint status={'alert'}>
        {t('screens.settingsScreen.backupSection.restoreSheet.warning')}
      </AppHint>
      <AppView>
        <RestoreInfoRow
          label={t('screens.settingsScreen.backupSection.restoreSheet.rowDate')}
          value={
            payload.date !== null
              ? formatBackupRestorationDate(payload.date, language)
              : t(
                  'screens.settingsScreen.backupSection.restoreSheet.dateUnknown',
                )
          }
        />
        <AppDivider />
        <RestoreInfoRow
          label={t(
            'screens.settingsScreen.backupSection.restoreSheet.rowWorkouts',
          )}
          value={String(payload.workouts.length)}
        />
        <AppDivider />
        <RestoreInfoRow
          label={t('screens.settingsScreen.backupSection.restoreSheet.rowLog')}
          value={String(payload.log.length)}
        />
        <AppDivider />
        <RestoreInfoRow
          label={t(
            'screens.settingsScreen.backupSection.restoreSheet.rowPeriod',
          )}
          value={period}
        />
      </AppView>
      <AppButton
        label={t('screens.settingsScreen.backupSection.restoreSheet.confirm')}
        onPress={onConfirm}
      />
    </AppView>
  );
};

export const RestoreBackupBottomSheetContent = memo(
  RestoreBackupBottomSheetContentComponent,
);
