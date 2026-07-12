import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { HistoryTrendChart } from '../HistoryTrendChart.tsx';

type HistoryChartCardProps = {
  data: WorkoutHistoryEntry[];
};

const HistoryChartCardComponent = ({ data }: HistoryChartCardProps) => {
  const t = useAppTranslation();

  const hasData = data.length > 0;

  const legendItems: { colorStatus: AppColorUnion; label: string }[] = [
    { colorStatus: 'primary', label: t('screens.historyScreen.legendTime') },
    {
      colorStatus: 'premium',
      label: t('screens.historyScreen.legendDifficulty'),
    },
  ];

  return (
    <AppView
      backgroundColorStatus={'backgroundAlt'}
      borderRadius={'m'}
      padding={'m'}
      gap={'s'}>
      <AppText category={'subHeader'}>
        {t('screens.historyScreen.chartTitle')}
      </AppText>
      <AppRow gap={'m'}>
        {legendItems.map(({ colorStatus, label }) => (
          <AppRow
            key={colorStatus}
            grow={false}
            alignItems={'center'}
            gap={'xs'}>
            <AppView
              width={14}
              height={3}
              borderRadius={'xxs'}
              backgroundColorStatus={colorStatus}
            />
            <AppText
              grow={false}
              category={'title'}
              colorStatus={'textMuted'}>
              {label}
            </AppText>
          </AppRow>
        ))}
      </AppRow>
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
