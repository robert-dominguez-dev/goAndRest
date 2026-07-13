import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { AppBadge } from '../../../../../common/AppBadge.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { formatTimerTime } from '../../../../../../helpers/formatTimerTime.tsx';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryEntryBadgeStatus } from '../../../../../../contexts/workoutHistory/helpers/getHistoryEntryBadgeStatus.ts';
import { formatHistoryListDate } from '../helpers/formatHistoryDate.ts';

type HistoryRecentListItemProps = {
  entry: WorkoutHistoryEntry;
  onPress: (entry: WorkoutHistoryEntry) => void;
  badgeStatus: HistoryEntryBadgeStatus | null;
};

const NO_RPE_PLACEHOLDER = '•';

const HistoryRecentListItemComponent = ({
  entry,
  onPress,
  badgeStatus,
}: HistoryRecentListItemProps) => {
  const { language } = useAppLanguage();
  const t = useAppTranslation();

  const rpeFace =
    entry.rpe !== null ? RPE_LEVELS[entry.rpe].face : NO_RPE_PLACEHOLDER;

  const dateLabel = formatHistoryListDate(entry.date, language);
  const timeLabel = formatTimerTime(entry.sec * ONE_SECOND_MS);

  const badgeByStatus = {
    deleted: {
      label: t('screens.historyScreen.badgeDeleted'),
      status: 'error' as const,
    },
    changed: {
      label: t('screens.historyScreen.badgeChanged'),
      status: 'alert' as const,
    },
  };

  const badge = entry.name && badgeStatus ? badgeByStatus[badgeStatus] : null;

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedbackConditionally(() => onPress(entry))}>
      <AppRow
        height={60}
        alignItems={'center'}
        gap={'sm'}>
        <AppText
          grow={false}
          category={'title'}>
          {rpeFace}
        </AppText>
        <AppView
          grow
          justifyContent={'center'}>
          <AppRow
            gap={'s'}
            alignItems={'center'}>
            <AppText
              grow={false}
              category={'title'}>
              {entry.name || dateLabel}
            </AppText>
            {badge && (
              <AppBadge
                label={badge.label}
                status={badge.status}
              />
            )}
          </AppRow>
          {entry.name && (
            <AppText
              grow={false}
              colorStatus={'textMuted'}
              category={'caption'}>
              {dateLabel}
            </AppText>
          )}
        </AppView>
        <AppText
          grow={false}
          colorStatus={'textMuted'}>
          {timeLabel}
        </AppText>
        <AppIcon
          name={'ChevronRight'}
          colorStatus={'textMuted'}
        />
      </AppRow>
    </Pressable>
  );
};

export const HistoryRecentListItem = memo(HistoryRecentListItemComponent);
