import { StyleSheet, View } from 'react-native';
import { Circle, Polyline, Svg, Text as SvgText } from 'react-native-svg';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';
import { RPE_LEVELS } from '../../../../../constants/rpe.ts';
import { formatHistoryAxisDate } from './helpers/formatHistoryDate.ts';

type HistoryTrendChartProps = {
  data: WorkoutHistoryEntry[];
};

const CHART_WIDTH = 340;
const CHART_HEIGHT = 158;
const MARGIN_LEFT = 6;
const MARGIN_RIGHT = 6;
const MARGIN_TOP = 26;
const MARGIN_BOTTOM = 22;
const PLOT_WIDTH = CHART_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const PLOT_HEIGHT = CHART_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
const MAX_RPE = 4;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: CHART_WIDTH / CHART_HEIGHT,
  },
});

type FeelPoint = {
  entry: WorkoutHistoryEntry;
  index: number;
  rpe: number;
};

export const HistoryTrendChart = ({ data }: HistoryTrendChartProps) => {
  const appColors = useAppThemedColors();
  const { language } = useAppLanguage();

  const count = data.length;

  const getX = (index: number): number =>
    count <= 1
      ? MARGIN_LEFT + PLOT_WIDTH / 2
      : MARGIN_LEFT + (index * PLOT_WIDTH) / (count - 1);

  const maxMinutes = Math.max(1, ...data.map(entry => (entry.sec || 0) / 60));

  const getTimeY = (entry: WorkoutHistoryEntry): number =>
    MARGIN_TOP +
    PLOT_HEIGHT -
    ((entry.sec || 0) / 60 / maxMinutes) * PLOT_HEIGHT;

  const getFeelY = (rpe: number): number =>
    MARGIN_TOP + PLOT_HEIGHT - (rpe / MAX_RPE) * PLOT_HEIGHT;

  const timePoints = data
    .map((entry, index) => `${getX(index)},${getTimeY(entry)}`)
    .join(' ');

  const feelPoints: FeelPoint[] = data
    .map((entry, index) => ({ entry, index, rpe: entry.rpe }))
    .filter((point): point is FeelPoint => point.rpe !== null);

  const feelPolyline = feelPoints
    .map(({ index, rpe }) => `${getX(index)},${getFeelY(rpe)}`)
    .join(' ');

  return (
    <View style={styles.container}>
      <Svg
        width={'100%'}
        height={'100%'}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
        <Polyline
          points={feelPolyline}
          fill={'none'}
          stroke={appColors.premium}
          strokeWidth={2.5}
          strokeDasharray={'5 4'}
          strokeLinejoin={'round'}
          strokeLinecap={'round'}
        />
        <Polyline
          points={timePoints}
          fill={'none'}
          stroke={appColors.primary}
          strokeWidth={2.5}
          strokeLinejoin={'round'}
          strokeLinecap={'round'}
        />
        {feelPoints.map(({ entry, index, rpe }) => (
          <SvgText
            key={`feel-${entry.date}-${index}`}
            x={getX(index)}
            y={getFeelY(rpe)}
            fontSize={15}
            textAnchor={'middle'}
            alignmentBaseline={'central'}>
            {RPE_LEVELS[rpe].face}
          </SvgText>
        ))}
        {data.map((entry, index) => (
          <Circle
            key={`time-${entry.date}-${index}`}
            cx={getX(index)}
            cy={getTimeY(entry)}
            r={3}
            fill={appColors.primary}
          />
        ))}
        {/* Halo behind the minute labels so they stay readable over the lines. */}
        {data.map((entry, index) => (
          <SvgText
            key={`time-halo-${entry.date}-${index}`}
            x={getX(index)}
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
            x={getX(index)}
            y={getTimeY(entry) - 9}
            fontSize={10}
            fill={appColors.primary}
            textAnchor={'middle'}>
            {`${Math.round((entry.sec || 0) / 60)} min`}
          </SvgText>
        ))}
        <SvgText
          x={MARGIN_LEFT}
          y={CHART_HEIGHT - 5}
          fontSize={11}
          fill={appColors.textMuted}
          textAnchor={'start'}>
          {formatHistoryAxisDate(data[0].date, language)}
        </SvgText>
        <SvgText
          x={MARGIN_LEFT + PLOT_WIDTH}
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
