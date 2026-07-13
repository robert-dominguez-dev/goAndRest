import { View } from 'react-native';
import { Circle, Polyline, Svg, Text as SvgText } from 'react-native-svg';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';
import { formatHistoryAxisDate } from './helpers/formatHistoryDate.ts';
import {
  CHART_HEIGHT,
  CHART_WIDTH,
  getX,
  historyChartStyles,
  MARGIN_TOP,
  PLOT_HEIGHT,
} from './helpers/historyChartLayout.ts';

type HistoryTrendChartProps = {
  data: WorkoutHistoryEntry[];
};

export const HistoryTrendChart = ({ data }: HistoryTrendChartProps) => {
  const appColors = useAppThemedColors();
  const { language } = useAppLanguage();

  const count = data.length;

  const minutes = data.map(entry => (entry.sec || 0) / 60);
  const minMinutes = Math.min(...minutes);
  const maxMinutes = Math.max(...minutes);
  const span = Math.max(1, maxMinutes - minMinutes);

  const getTimeY = (entry: WorkoutHistoryEntry): number =>
    MARGIN_TOP +
    PLOT_HEIGHT -
    (((entry.sec || 0) / 60 - minMinutes) / span) * PLOT_HEIGHT;

  const timePoints = data
    .map((entry, index) => `${getX(index, count)},${getTimeY(entry)}`)
    .join(' ');

  return (
    <View style={historyChartStyles.container}>
      <Svg
        width={'100%'}
        height={'100%'}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
        <Polyline
          points={timePoints}
          fill={'none'}
          stroke={appColors.primary}
          strokeWidth={2.5}
          strokeLinejoin={'round'}
          strokeLinecap={'round'}
        />
        {data.map((entry, index) => (
          <Circle
            key={`time-${entry.date}-${index}`}
            cx={getX(index, count)}
            cy={getTimeY(entry)}
            r={3}
            fill={appColors.primary}
          />
        ))}
        {/* Halo behind the minute labels so they stay readable over the line. */}
        {data.map((entry, index) => (
          <SvgText
            key={`time-halo-${entry.date}-${index}`}
            x={getX(index, count)}
            y={getTimeY(entry) - 9}
            fontSize={10}
            fill={appColors.backgroundAlt}
            stroke={appColors.backgroundAlt}
            strokeWidth={2.6}
            strokeLinejoin={'round'}
            textAnchor={'middle'}>
            {`${Math.round((entry.sec || 0) / 60)} min`}
          </SvgText>
        ))}
        {data.map((entry, index) => (
          <SvgText
            key={`time-label-${entry.date}-${index}`}
            x={getX(index, count)}
            y={getTimeY(entry) - 9}
            fontSize={10}
            fill={appColors.primary}
            textAnchor={'middle'}>
            {`${Math.round((entry.sec || 0) / 60)} min`}
          </SvgText>
        ))}
        <SvgText
          x={0}
          y={CHART_HEIGHT - 5}
          fontSize={11}
          fill={appColors.textMuted}
          textAnchor={'start'}>
          {formatHistoryAxisDate(data[0].date, language)}
        </SvgText>
        <SvgText
          x={CHART_WIDTH}
          y={CHART_HEIGHT - 5}
          fontSize={11}
          fill={appColors.textMuted}
          textAnchor={'end'}>
          {formatHistoryAxisDate(data[count - 1].date, language)}
        </SvgText>
      </Svg>
    </View>
  );
};
