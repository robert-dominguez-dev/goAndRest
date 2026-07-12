import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { formatTimerTime } from '../../../../../../helpers/formatTimerTime.tsx';
import { ONE_SECOND_MS } from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { getRoundsLabel } from '../helpers/getRoundsLabel.ts';
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
  const t = useAppTranslation();
  const { language } = useAppLanguage();

  const rpeFace =
    entry.rpe !== null ? RPE_LEVELS[entry.rpe].face : NO_RPE_PLACEHOLDER;

  const timeLabel = formatTimerTime(entry.sec * ONE_SECOND_MS);

  const rightLabel = entry.rounds
    ? `${getRoundsLabel(entry.rounds, t)} · ${timeLabel}`
    : timeLabel;

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedbackConditionally(() => onPress(entry))}>
      <AppRow
        alignItems={'center'}
        gap={'sm'}
        paddingVertical={'s'}>
        <AppText
          grow={false}
          category={'title'}>
          {rpeFace}
        </AppText>
        <AppText category={'contentBold'}>
          {formatHistoryListDate(entry.date, language)}
        </AppText>
        <AppText
          grow={false}
          colorStatus={'textMuted'}>
          {rightLabel}
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
