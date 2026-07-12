import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import {
  DASH,
  FILL_CONTAINER_DIMENSION,
} from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { getFinishedWorkoutStreakLabel } from '../helpers/getFinishedWorkoutStreakLabel.ts';

const MOTIVATIONAL_STREAK_VALUE = '💪';

type FinishedWorkoutSummaryProps = {
  rpe: number | null;
  streak: number;
  weekVolumeStats: { min: number; count: number };
  isPremium: boolean;
  onHistoryPress: () => void;
};

const FinishedWorkoutSummaryComponent = ({
  rpe,
  streak,
  weekVolumeStats,
  isPremium,
  onHistoryPress,
}: FinishedWorkoutSummaryProps) => {
  const t = useAppTranslation();

  const rpeLevel = rpe !== null ? RPE_LEVELS[rpe] : undefined;

  return (
    <AppView gap={'m'}>
      <AppDivider />
      <AppView
        alignItems={'center'}
        gap={'xs'}>
        <AppText
          category={'subHeader'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.finishedWorkoutScreen.difficultyLabel')}
        </AppText>
        <AppText
          category={'header'}
          fontSizeOverride={'xl'}
          textAlign={'center'}>
          {rpeLevel ? rpeLevel.face : DASH}
        </AppText>
        {rpeLevel && (
          <AppText
            category={'contentBold'}
            textAlign={'center'}>
            {t(rpeLevel.labelKey)}
          </AppText>
        )}
      </AppView>
      <AppRow
        gap={'s'}
        width={FILL_CONTAINER_DIMENSION}>
        <AppView
          grow
          flexBasis={0}
          alignItems={'center'}
          backgroundColorStatus={'backgroundAlt'}
          borderRadius={'m'}
          paddingVertical={'s'}
          paddingHorizontal={'s'}>
          <AppText
            category={'header'}
            textAlign={'center'}>
            {streak > 0 ? `🔥 ${streak}` : MOTIVATIONAL_STREAK_VALUE}
          </AppText>
          <AppText
            category={'contentBold'}
            colorStatus={'textMuted'}
            textAlign={'center'}>
            {getFinishedWorkoutStreakLabel(streak, t)}
          </AppText>
        </AppView>
        <AppView
          grow
          flexBasis={0}
          alignItems={'center'}
          backgroundColorStatus={'backgroundAlt'}
          borderRadius={'m'}
          paddingVertical={'s'}
          paddingHorizontal={'s'}>
          <AppText
            category={'header'}
            textAlign={'center'}>
            {`${weekVolumeStats.count}×`}
          </AppText>
          <AppText
            category={'contentBold'}
            colorStatus={'textMuted'}
            textAlign={'center'}>
            {t('screens.finishedWorkoutScreen.weekTileLabel', {
              min: weekVolumeStats.min,
            })}
          </AppText>
        </AppView>
      </AppRow>
      <Pressable
        onPress={getOnPressWithHapticFeedbackConditionally(onHistoryPress)}>
        <AppRow
          alignItems={'center'}
          gap={'sm'}
          padding={'m'}
          borderRadius={'m'}
          backgroundColorStatus={'backgroundAlt'}>
          <AppIcon
            name={'History'}
            colorStatus={'textMuted'}
          />
          <AppText category={'contentBold'}>
            {t(
              isPremium
                ? 'screens.finishedWorkoutScreen.historyLinkPremium'
                : 'screens.finishedWorkoutScreen.historyLinkFree',
            )}
          </AppText>
          <AppIcon
            name={isPremium ? 'ArrowRight' : 'Lock'}
            colorStatus={isPremium ? 'textMuted' : 'premium'}
          />
        </AppRow>
      </Pressable>
    </AppView>
  );
};

export const FinishedWorkoutSummary = memo(FinishedWorkoutSummaryComponent);
