import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { WorkoutOutcomeTiles } from '../../../../../common/WorkoutOutcomeTiles/WorkoutOutcomeTiles.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { WeekStatsRow } from '../../HistoryScreen/components/WeekStatsRow.tsx';

const SECTION_HEADING_FONT_SIZE = 14;

type FinishedWorkoutSummaryProps = {
  sec: number;
  rpe: number | null;
  streak: number;
  weekVolumeStats: { min: number; count: number };
  isPremium: boolean;
  onHistoryPress: () => void;
};

const FinishedWorkoutSummaryComponent = ({
  sec,
  rpe,
  streak,
  weekVolumeStats,
  isPremium,
  onHistoryPress,
}: FinishedWorkoutSummaryProps) => {
  const t = useAppTranslation();

  return (
    <AppView gap={'m'}>
      <AppView gap={'s'}>
        <AppText
          category={'title'}
          colorStatus={'textMuted'}
          fontSizeOverride={SECTION_HEADING_FONT_SIZE}>
          {t('screens.finishedWorkoutScreen.thisWorkoutTitle').toUpperCase()}
        </AppText>
        <WorkoutOutcomeTiles
          sec={sec}
          rpe={rpe}
        />
      </AppView>
      <AppView gap={'s'}>
        <AppText
          category={'title'}
          colorStatus={'textMuted'}
          fontSizeOverride={SECTION_HEADING_FONT_SIZE}>
          {t(
            'screens.finishedWorkoutScreen.overallProgressTitle',
          ).toUpperCase()}
        </AppText>
        <WeekStatsRow
          streak={streak}
          weekVolumeStats={weekVolumeStats}
        />
      </AppView>
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
            {t('screens.finishedWorkoutScreen.historyLink')}
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
