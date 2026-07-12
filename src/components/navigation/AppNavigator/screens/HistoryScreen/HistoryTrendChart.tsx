import { Circle, Line, Polyline, Svg } from 'react-native-svg';
import { useAppThemedColors } from '../../../../../hooks/useAppThemedColors.ts';
import { WorkoutHistoryEntry } from '../../../../../contexts/workoutHistory/types.ts';

type HistoryTrendChartProps = {
  data: WorkoutHistoryEntry[];
};

const CHART_WIDTH = 320;
const CHART_HEIGHT = 128;
const CHART_PADDING = 14;
const GRID_LINE_RATIOS = [0.25, 0.5, 0.75];
const MAX_RPE = 4;

export const HistoryTrendChart = ({ data }: HistoryTrendChartProps) => {
  const appColors = useAppThemedColors();

  const count = data.length;

  const getX = (index: number): number =>
    count <= 1
      ? CHART_WIDTH / 2
      : CHART_PADDING +
        (index * (CHART_WIDTH - 2 * CHART_PADDING)) / (count - 1);

  const maxSec = Math.max(1, ...data.map(entry => entry.sec || 0));

  const getTimeY = (entry: WorkoutHistoryEntry): number =>
    CHART_HEIGHT -
    CHART_PADDING -
    ((entry.sec || 0) / maxSec) * (CHART_HEIGHT - 2 * CHART_PADDING);

  const getRpeY = (entry: WorkoutHistoryEntry): number =>
    CHART_HEIGHT -
    CHART_PADDING -
    ((entry.rpe ?? 0) / MAX_RPE) * (CHART_HEIGHT - 2 * CHART_PADDING);

  const timePoints = data
    .map((entry, index) => `${getX(index)},${getTimeY(entry)}`)
    .join(' ');

  const rpeEntries = data
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.rpe !== null);

  const rpePoints = rpeEntries
    .map(({ entry, index }) => `${getX(index)},${getRpeY(entry)}`)
    .join(' ');

  return (
    <Svg
      width={'100%'}
      height={CHART_HEIGHT}
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      preserveAspectRatio={'none'}>
      {GRID_LINE_RATIOS.map(ratio => (
        <Line
          key={ratio}
          x1={CHART_PADDING}
          y1={CHART_PADDING + ratio * (CHART_HEIGHT - 2 * CHART_PADDING)}
          x2={CHART_WIDTH - CHART_PADDING}
          y2={CHART_PADDING + ratio * (CHART_HEIGHT - 2 * CHART_PADDING)}
          stroke={appColors.border}
          strokeWidth={1}
          vectorEffect={'non-scaling-stroke'}
        />
      ))}
      <Polyline
        points={timePoints}
        fill={'none'}
        stroke={appColors.primary}
        strokeWidth={2.5}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        vectorEffect={'non-scaling-stroke'}
      />
      <Polyline
        points={rpePoints}
        fill={'none'}
        stroke={appColors.premium}
        strokeWidth={2.5}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        vectorEffect={'non-scaling-stroke'}
      />
      {data.map((entry, index) => (
        <Circle
          key={`time-${entry.date}-${index}`}
          cx={getX(index)}
          cy={getTimeY(entry)}
          r={3}
          fill={appColors.primary}
          vectorEffect={'non-scaling-stroke'}
        />
      ))}
      {rpeEntries.map(({ entry, index }) => (
        <Circle
          key={`rpe-${entry.date}-${index}`}
          cx={getX(index)}
          cy={getRpeY(entry)}
          r={3}
          fill={appColors.premium}
          vectorEffect={'non-scaling-stroke'}
        />
      ))}
    </Svg>
  );
};
