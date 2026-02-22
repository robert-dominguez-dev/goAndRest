import {
  AppCircularSliderBase,
  AppCircularSliderBaseProps,
} from './AppCircularSliderBase.tsx';
import {
  useCircularSliderGeometry,
  UseCircularSliderGeometryParams,
} from '../hooks/useCircularSliderGeometry.ts';
import { AppView } from '../../../common/AppView/AppView.tsx';
import { memo } from 'react';

type AppCircularIndicatorProps = Omit<
  UseCircularSliderGeometryParams,
  'padding'
> &
  Pick<
    AppCircularSliderBaseProps,
    'children' | 'trackColor' | 'filledTrackColor'
  >;

const AppCircularIndicatorComponent = ({
  children,
  value,
  maxValue,
  radius,
  strokeWidth,
  isRunning,
  trackColor,
  filledTrackColor,
}: AppCircularIndicatorProps) => {
  const { size, center, circumference, theta } = useCircularSliderGeometry({
    value,
    maxValue,
    radius,
    strokeWidth,
    isRunning,
  });

  return (
    <AppCircularSliderBase
      size={size}
      center={center}
      circumference={circumference}
      theta={theta}
      trackColor={trackColor}
      filledTrackColor={filledTrackColor}
      radius={radius}
      strokeWidth={strokeWidth}
      maxValue={maxValue}>
      <AppView
        width={size}
        height={size}
        borderRadius={size / 2}
        alignItems={'center'}
        justifyContent={'center'}>
        {children}
      </AppView>
    </AppCircularSliderBase>
  );
};

export const AppCircularIndicator = memo(AppCircularIndicatorComponent);
