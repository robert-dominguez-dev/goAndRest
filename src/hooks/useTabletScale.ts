import { useIsTablet } from './useIsTablet.ts';
import { TabletScaleStep } from '../types/common.ts';
import {
  TabletScaleValueMap,
  useGetByTabletScale,
} from './useGetByTabletScale.ts';

const scaleMap: TabletScaleValueMap<number> = {
  [TabletScaleStep.large]: 1.3,
  [TabletScaleStep.medium]: 1.2,
  [TabletScaleStep.small]: 1.1,
};

export const useTabletScale = (): number => {
  const isTablet = useIsTablet();

  const getByTabletScale = useGetByTabletScale();

  if (!isTablet) {
    return 1;
  }

  return getByTabletScale(scaleMap);
};
