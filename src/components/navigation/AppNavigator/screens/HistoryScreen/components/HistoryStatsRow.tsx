import { memo } from 'react';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { DASH } from '../../../../../../constants/common.ts';
import { getStreakLabel } from '../helpers/getStreakLabel.ts';
import { getWeekVolumeLabel } from '../helpers/getWeekVolumeLabel.ts';

type WeekVolumeStats = {
  min: number;
  count: number;
};

type HistoryStatsRowProps = {
  streak: number;
  weekVolumeStats: WeekVolumeStats;
};

const HistoryStatsRowComponent = ({
  streak,
  weekVolumeStats,
}: HistoryStatsRowProps) => {
  const t = useAppTranslation();

  return (
    <AppRow gap={'s'}>
      <AppView
        grow
        flexBasis={0}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        padding={'m'}>
        <AppText
          grow={false}
          category={'header'}
          textAlign={'center'}>
          {streak > 0 ? `🔥 ${streak}` : DASH}
        </AppText>
        <AppText
          grow={false}
          category={'content'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {getStreakLabel(streak, t)}
        </AppText>
      </AppView>
      <AppView
        grow
        flexBasis={0}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColorStatus={'backgroundAlt'}
        borderRadius={'m'}
        padding={'m'}
        gap={'s'}>
        <AppText
          grow={false}
          category={'content'}
          colorStatus={'textMuted'}
          textAlign={'center'}>
          {t('screens.historyScreen.weekTitle')}
        </AppText>
        <AppText
          grow={false}
          category={'title'}
          textAlign={'center'}>
          {getWeekVolumeLabel(weekVolumeStats.min, weekVolumeStats.count, t)}
        </AppText>
      </AppView>
    </AppRow>
  );
};

export const HistoryStatsRow = memo(HistoryStatsRowComponent);
