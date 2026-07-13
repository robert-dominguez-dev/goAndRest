import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryTrendChart } from '../HistoryTrendChart.tsx';
import { HistoryChartEmpty } from './HistoryChartEmpty.tsx';
import { MIN_RATED_ENTRIES_FOR_CHART } from '../../HistoryDetailScreen/HistoryDetailScreen.tsx';

type HistoryChartCardProps = {
  data: WorkoutHistoryEntry[];
};

const HistoryChartCardComponent = ({ data }: HistoryChartCardProps) => {
  const t = useAppTranslation();

  const hasData = data.length >= MIN_RATED_ENTRIES_FOR_CHART;

  return (
    <AppView
      backgroundColorStatus={'backgroundAlt'}
      borderRadius={'m'}
      padding={'m'}
      gap={'s'}>
      <AppView>
        <AppText category={'subHeader'}>
          {t('screens.historyScreen.chartTitle').toUpperCase()}
        </AppText>
        <AppText
          category={'content'}
          colorStatus={'inputTextMuted'}>
          {t('screens.historyScreen.chartSubtitle')}
        </AppText>
      </AppView>
      {hasData ? <HistoryTrendChart data={data} /> : <HistoryChartEmpty />}
    </AppView>
  );
};

export const HistoryChartCard = memo(HistoryChartCardComponent);
