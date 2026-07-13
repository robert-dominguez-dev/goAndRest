import { memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getStreakLabel } from '../helpers/getStreakLabel.ts';
import { getWeekVolumeLabel } from '../helpers/getWeekVolumeLabel.ts';

const MOTIVATIONAL_STREAK_VALUE = '💪';

type WeekVolumeStats = {
  min: number;
  count: number;
};

type HistoryStatsRowProps = {
  streak: number;
  weekVolumeStats: WeekVolumeStats;
};

const WeekStatsRowComponent = ({
  streak,
  weekVolumeStats,
}: HistoryStatsRowProps) => {
  const t = useAppTranslation();

  return (
    <AppRow gap={'sm'}>
      <AppView
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        paddingVertical={'m'}
        paddingHorizontal={'xl'}>
        <AppText
          grow={false}
          category={'header'}
          textAlign={'center'}>
          {streak > 0 ? `🔥 ${streak}` : MOTIVATIONAL_STREAK_VALUE}
        </AppText>
        <AppText
          grow={false}
          category={'contentBold'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {getStreakLabel(streak, t)}
        </AppText>
      </AppView>
      <AppView
        grow
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        padding={'m'}
        gap={'s'}>
        <AppText
          grow={false}
          category={'title'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.historyScreen.weekTitle').toUpperCase()}
        </AppText>
        <AppText
          grow={false}
          category={'subHeader'}
          textAlign={'center'}>
          {getWeekVolumeLabel(weekVolumeStats.min, weekVolumeStats.count, t)}
        </AppText>
      </AppView>
    </AppRow>
  );
};

export const WeekStatsRow = memo(WeekStatsRowComponent);
