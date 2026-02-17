import { AppView, AppViewProps } from './AppView/AppView.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../constants/common.ts';

type OrientationDependentProps = Pick<AppViewProps, 'width' | 'height'>;

type AppDividerProps = Pick<AppViewProps, 'backgroundColorStatus'> & {
  isVertical?: boolean;
  size?: number;
};

export const AppDivider = ({
  isVertical,
  backgroundColorStatus = 'border',
  size = 1,
}: AppDividerProps) => {
  const orientationDependentProps: OrientationDependentProps = isVertical
    ? { width: size, height: FILL_CONTAINER_DIMENSION }
    : { width: FILL_CONTAINER_DIMENSION, height: size };

  return (
    <AppView
      {...orientationDependentProps}
      backgroundColorStatus={backgroundColorStatus}
    />
  );
};
