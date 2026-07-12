import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { AppButton } from '../../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import {
  DASH,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../../constants/common.ts';
import { formatHistoryDetailDate } from '../../HistoryScreen/helpers/formatHistoryDate.ts';
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
    <AppText colorStatus={'textMuted'}>{label}</AppText>
    <AppText category={'subHeader'}>{value}</AppText>
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
      ? `${formatHistoryDetailDate(
          dates[0],
          language,
        )} – ${formatHistoryDetailDate(dates[dates.length - 1], language)}`
      : formatHistoryDetailDate(dates[0], language)
    : DASH;

  return (
    <AppView gap={'m'}>
      <AppRow
        gap={'s'}
        alignItems={'flex-start'}
        padding={'m'}
        borderRadius={'m'}
        backgroundColorStatus={'backgroundAlt'}
        borderColorStatus={'negative'}>
        <AppIcon
          name={'TriangleAlert'}
          colorStatus={'negative'}
        />
        <AppText
          grow
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('screens.settingsScreen.backupSection.restoreSheet.warning')}
        </AppText>
      </AppRow>
      <AppView>
        <RestoreInfoRow
          label={t('screens.settingsScreen.backupSection.restoreSheet.rowDate')}
          value={
            payload.date !== null
              ? formatHistoryDetailDate(payload.date, language)
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
