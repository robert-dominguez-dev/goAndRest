import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { DASH } from '../../../../../../constants/common.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { WeekStatsRow } from '../../HistoryScreen/components/WeekStatsRow.tsx';

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
      <AppView
        alignItems={'center'}
        gap={'s'}>
        <AppText
          grow={false}
          category={'title'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.finishedWorkoutScreen.difficultyLabel').toUpperCase()}
        </AppText>
        <AppView>
          <AppText
            grow={false}
            fontSizeOverride={'xl'}
            lineHeightMultiplier={1.2}
            textAlign={'center'}>
            {rpeLevel ? rpeLevel.face : DASH}
          </AppText>
          {rpeLevel && (
            <AppText
              grow={false}
              category={'subHeader'}
              textAlign={'center'}>
              {t(rpeLevel.labelKey).toUpperCase()}
            </AppText>
          )}
        </AppView>
      </AppView>
      <WeekStatsRow
        streak={streak}
        weekVolumeStats={weekVolumeStats}
      />
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
