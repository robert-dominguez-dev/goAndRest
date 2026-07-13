import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryTrendChart } from '../HistoryTrendChart.tsx';

type HistoryChartCardProps = {
  data: WorkoutHistoryEntry[];
};

const HistoryChartCardComponent = ({ data }: HistoryChartCardProps) => {
  const t = useAppTranslation();

  const hasData = data.length > 0;

  return (
    <AppView
      backgroundColorStatus={'backgroundAlt'}
      borderRadius={'m'}
      padding={'m'}
      gap={'s'}>
      <AppText category={'subHeader'}>
        {t('screens.historyScreen.chartTitle')}
      </AppText>
      {hasData ? (
        <HistoryTrendChart data={data} />
      ) : (
        <AppText
          colorStatus={'textMuted'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('screens.historyScreen.chartEmpty')}
        </AppText>
      )}
    </AppView>
  );
};

export const HistoryChartCard = memo(HistoryChartCardComponent);
