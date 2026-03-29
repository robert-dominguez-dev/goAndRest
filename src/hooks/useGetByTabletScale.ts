import { TabletScaleStep } from '../types/common.ts';
import { useWindowDimensions } from 'react-native';

const tabletScaleStepsSorted: TabletScaleStep[] = [
  TabletScaleStep.large,
  TabletScaleStep.medium,
  TabletScaleStep.small,
];

export type TabletScaleValueMap<TValue> = Record<TabletScaleStep, TValue>;

export type GetByTabletScaleHandler = <TValue>(
  scaleMap: TabletScaleValueMap<TValue>,
) => TValue;

export const useGetByTabletScale = (): GetByTabletScaleHandler => {
  const { width, height } = useWindowDimensions();

  const size = Math.min(width, height);

  return scaleMap => {
    const tabletScaleStep = tabletScaleStepsSorted.find(step => size >= step);
    return tabletScaleStep
      ? scaleMap[tabletScaleStep]
      : scaleMap[TabletScaleStep.small];
  };
};
