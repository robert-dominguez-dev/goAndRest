import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { formatTimerTime } from '../../../../../../helpers/formatTimerTime.tsx';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { formatHistoryListDate } from '../helpers/formatHistoryDate.ts';

type HistoryRecentListItemProps = {
  entry: WorkoutHistoryEntry;
  onPress: (entry: WorkoutHistoryEntry) => void;
};

const NO_RPE_PLACEHOLDER = '•';

const HistoryRecentListItemComponent = ({
  entry,
  onPress,
}: HistoryRecentListItemProps) => {
  const { language } = useAppLanguage();

  const rpeFace =
    entry.rpe !== null ? RPE_LEVELS[entry.rpe].face : NO_RPE_PLACEHOLDER;

  const dateLabel = formatHistoryListDate(entry.date, language);
  const timeLabel = formatTimerTime(entry.sec * ONE_SECOND_MS);

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
          <AppText
            grow={false}
            category={'title'}>
            {entry.name || dateLabel}
          </AppText>
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
