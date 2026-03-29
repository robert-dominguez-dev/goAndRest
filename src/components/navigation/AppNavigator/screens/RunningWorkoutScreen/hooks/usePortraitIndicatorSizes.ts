import { useWindowDimensions } from 'react-native';
import { useIsTablet } from '../../../../../../hooks/useIsTablet.ts';
import { TabletScaleStep } from '../../../../../../types/common.ts';
import {
  GetByTabletScaleHandler,
  TabletScaleValueMap,
  useGetByTabletScale,
} from '../../../../../../hooks/useGetByTabletScale.ts';
import { TABLET_MAX_ACTIVE_UI_WIDTH_RATIO } from '../../../../../../constants/common.ts';
import { AppSize } from '../../../../../../types/ui.ts';

const PHONE_HORIZONTAL_PADDING = AppSize.m;
const PHONE_STROKE_WIDTH = AppSize.m;
const PHONE_GAP = AppSize.s;

type TabletStepDimensions = {
  strokeWidth: number;
  gap: number;
};

const tabletScaleDimensionsMap: TabletScaleValueMap<TabletStepDimensions> = {
  [TabletScaleStep.large]: { strokeWidth: 28, gap: 12 },
  [TabletScaleStep.medium]: { strokeWidth: 24, gap: 12 },
  [TabletScaleStep.small]: {
    strokeWidth: 20,
    gap: 8,
  },
};

type PortraitIndicatorSizes = {
  strokeWidth: number;
  outerRadius: number;
  innerRadius: number;
  pulsingBackgroundSize: number;
};

const countInnerRadius = ({
  outerRadius,
  strokeWidth,
  gap,
}: Pick<PortraitIndicatorSizes, 'outerRadius' | 'strokeWidth'> & {
  gap: number;
}) => outerRadius - strokeWidth - gap;

const countPulsingBackgroundSize = ({
  innerRadius,
  strokeWidth,
}: Pick<PortraitIndicatorSizes, 'innerRadius' | 'strokeWidth'>) =>
  (innerRadius - strokeWidth) * 2;

const getPhoneSizes = (windowWidth: number): PortraitIndicatorSizes => {
  const strokeWidth = PHONE_STROKE_WIDTH;

  const outerRadius = windowWidth / 2 - strokeWidth - PHONE_HORIZONTAL_PADDING;

  const innerRadius = countInnerRadius({
    outerRadius,
    strokeWidth,
    gap: PHONE_GAP,
  });

  return {
    outerRadius,
    strokeWidth,
    innerRadius,
    pulsingBackgroundSize: countPulsingBackgroundSize({
      innerRadius,
      strokeWidth,
    }),
  };
};

const getTabletSizes = (
  windowWidth: number,
  getByTabletScale: GetByTabletScaleHandler,
): PortraitIndicatorSizes => {
  const { strokeWidth, gap } = getByTabletScale(tabletScaleDimensionsMap);

  const outerRadius: number =
    (windowWidth * TABLET_MAX_ACTIVE_UI_WIDTH_RATIO) / 2 - strokeWidth;

  const innerRadius = countInnerRadius({
    outerRadius,
    strokeWidth,
    gap,
  });

  return {
    strokeWidth,
    outerRadius,
    innerRadius,
    pulsingBackgroundSize: countPulsingBackgroundSize({
      innerRadius,
      strokeWidth,
    }),
  };
};

export const usePortraitIndicatorSizes = (): PortraitIndicatorSizes => {
  const isTablet = useIsTablet();

  const { width } = useWindowDimensions();

  const getByTabletScale = useGetByTabletScale();

  return isTablet
    ? getTabletSizes(width, getByTabletScale)
    : getPhoneSizes(width);
};
