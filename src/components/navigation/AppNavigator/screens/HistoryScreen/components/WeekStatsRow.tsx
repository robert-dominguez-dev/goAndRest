import { memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getStreakLabel } from '../helpers/getStreakLabel.ts';
import { getWeekVolumeLabel } from '../helpers/getWeekVolumeLabel.ts';
import { StatBoxWithTitle } from './StatBoxWithTitle.tsx';
import { StatBox } from './StatBox.tsx';

export const SMALLER_SUMMARY_CARD_WIDTH = 140;

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
      <StatBox width={SMALLER_SUMMARY_CARD_WIDTH}>
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
      </StatBox>
      <StatBoxWithTitle title={t('screens.historyScreen.weekTitle')}>
        <AppText
          grow={false}
          category={'subHeader'}
          textAlign={'center'}>
          {getWeekVolumeLabel(weekVolumeStats.min, weekVolumeStats.count, t)}
        </AppText>
      </StatBoxWithTitle>
    </AppRow>
  );
};

export const WeekStatsRow = memo(WeekStatsRowComponent);
