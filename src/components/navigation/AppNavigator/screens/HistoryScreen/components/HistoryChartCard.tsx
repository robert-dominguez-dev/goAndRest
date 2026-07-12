import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppLanguage } from '../../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';
import { RPE_LEVELS } from '../../../../../../constants/rpe.ts';
import { WorkoutHistoryEntry } from '../../../../../../contexts/workoutHistory/types.ts';
import { CHART_HEIGHT, HistoryTrendChart } from '../HistoryTrendChart.tsx';
import { formatHistoryAxisDate } from '../helpers/formatHistoryDate.ts';

type HistoryChartCardProps = {
  data: WorkoutHistoryEntry[];
};

const getAxisDateIndexes = (count: number): number[] =>
  count <= 1
    ? [0]
    : [...new Set([0, Math.floor((count - 1) / 2), count - 1])];

const HistoryChartCardComponent = ({ data }: HistoryChartCardProps) => {
  const t = useAppTranslation();
  const { language } = useAppLanguage();

  const hasData = data.length > 0;

  const maxMinutes = Math.max(
    1,
    Math.round(Math.max(0, ...data.map(entry => entry.sec)) / 60),
  );

  const axisDateIndexes = getAxisDateIndexes(data.length);

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
              width={12}
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
        <AppRow
          gap={'xs'}
          alignItems={'flex-start'}>
          <AppView
            grow={false}
            height={CHART_HEIGHT}
            justifyContent={'space-between'}
            alignItems={'flex-end'}
            paddingVertical={'xs'}>
            <AppText
              grow={false}
              category={'title'}
              colorStatus={'textMuted'}>
              {`${maxMinutes} min`}
            </AppText>
            <AppText
              grow={false}
              category={'title'}
              colorStatus={'textMuted'}>
              {'0'}
            </AppText>
          </AppView>
          <AppView
            grow
            gap={'xs'}>
            <HistoryTrendChart data={data} />
            <AppRow justifyContent={'space-between'}>
              {axisDateIndexes.map(index => (
                <AppText
                  key={data[index].date}
                  grow={false}
                  category={'title'}
                  colorStatus={'textMuted'}>
                  {formatHistoryAxisDate(data[index].date, language)}
                </AppText>
              ))}
            </AppRow>
          </AppView>
          <AppView
            grow={false}
            height={CHART_HEIGHT}
            justifyContent={'space-between'}
            paddingVertical={'xs'}>
            <AppText
              grow={false}
              category={'title'}>
              {RPE_LEVELS[RPE_LEVELS.length - 1].face}
            </AppText>
            <AppText
              grow={false}
              category={'title'}>
              {RPE_LEVELS[0].face}
            </AppText>
          </AppView>
        </AppRow>
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
