import { StyleSheet, View } from 'react-native';
import { Polyline, Svg, Text as SvgText } from 'react-native-svg';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { useAppLanguage } from '../../../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';
import { RPE_LEVELS } from '../../../../../constants/rpe.ts';
import { formatHistoryAxisDate } from './helpers/formatHistoryDate.ts';
import {
  CHART_HEIGHT,
  CHART_WIDTH,
  getX,
  historyChartStyles,
  MARGIN_TOP,
  MAX_RPE,
  PLOT_HEIGHT,
} from './helpers/historyChartLayout.ts';

const AREA_BACKGROUND_ALPHA_SUFFIX = '14';

type HistoryDifficultyChartProps = {
  data: WorkoutHistoryEntry[];
};

type FeelPoint = {
  entry: WorkoutHistoryEntry;
  index: number;
  rpe: number;
};

export const HistoryDifficultyChart = ({
  data,
}: HistoryDifficultyChartProps) => {
  const appColors = useAppThemedColors();
  const { language } = useAppLanguage();

  const count = data.length;

  const getFeelY = (rpe: number): number =>
    MARGIN_TOP + PLOT_HEIGHT - (rpe / MAX_RPE) * PLOT_HEIGHT;

  const feelPoints: FeelPoint[] = data
    .map((entry, index) => ({ entry, index, rpe: entry.rpe }))
    .filter((point): point is FeelPoint => point.rpe !== null);

  const feelPolyline = feelPoints
    .map(({ index, rpe }) => `${getX(index, count)},${getFeelY(rpe)}`)
    .join(' ');

  return (
    <View
      style={[
        styles.areaBackground,
        { backgroundColor: `${appColors.text}${AREA_BACKGROUND_ALPHA_SUFFIX}` },
      ]}>
      <View style={historyChartStyles.container}>
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
          {feelPoints.map(({ entry, index, rpe }) => (
            <SvgText
              key={`feel-${entry.date}-${index}`}
              x={getX(index, count)}
              y={getFeelY(rpe)}
              fontSize={16}
              textAnchor={'middle'}
              alignmentBaseline={'central'}>
              {RPE_LEVELS[rpe].face}
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
    </View>
  );
};

const styles = StyleSheet.create({
  areaBackground: {
    borderRadius: 12,
    paddingTop: 10,
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
});
