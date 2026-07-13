import { StyleSheet } from 'react-native';

export const CHART_WIDTH = 340;
export const CHART_HEIGHT = 122;
export const MARGIN_LEFT = 10;
export const MARGIN_RIGHT = 10;
export const MARGIN_TOP = 26;
export const MARGIN_BOTTOM = 26;
export const PLOT_WIDTH = CHART_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
export const PLOT_HEIGHT = CHART_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
export const MAX_RPE = 4;

export const getX = (index: number, count: number): number =>
  count <= 1
    ? MARGIN_LEFT + PLOT_WIDTH / 2
    : MARGIN_LEFT + (index * PLOT_WIDTH) / (count - 1);

export const historyChartStyles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: CHART_WIDTH / CHART_HEIGHT,
  },
});
