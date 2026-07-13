import {
  getX,
  MARGIN_LEFT,
  PLOT_WIDTH,
} from './historyChartLayout.ts';

describe('getX', () => {
  it('returns the horizontal center when count is 0', () => {
    expect(getX(0, 0)).toBe(MARGIN_LEFT + PLOT_WIDTH / 2);
  });

  it('returns the horizontal center when count is 1', () => {
    expect(getX(0, 1)).toBe(MARGIN_LEFT + PLOT_WIDTH / 2);
  });

  it('places the first point at the left margin when count > 1', () => {
    expect(getX(0, 4)).toBe(MARGIN_LEFT);
  });

  it('places the last point at the right edge of the plot when count > 1', () => {
    expect(getX(3, 4)).toBe(MARGIN_LEFT + PLOT_WIDTH);
  });

  it('places an intermediate point proportionally between the margins', () => {
    expect(getX(1, 4)).toBe(MARGIN_LEFT + (1 * PLOT_WIDTH) / 3);
  });
});
