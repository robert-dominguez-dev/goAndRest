import { AppViewProps } from '../../../../../common/AppView/AppView.tsx';

export type RunningWorkoutSkipButtonDirection = 'left' | 'right';

type HorizontalPositionProps = Pick<AppViewProps, 'left' | 'right'>;

type DependentHorizontalPositionProps = {
  iconProps: HorizontalPositionProps;
  textProps: HorizontalPositionProps;
};

type DirectionIndependentProps = {
  iconVerticalOffset: number;
  textVerticalOffset: number;
};

export const useRunningWorkoutSkipButtonUIProps = (
  direction: RunningWorkoutSkipButtonDirection,
  offsetBaseSize: number,
): DependentHorizontalPositionProps & DirectionIndependentProps => {
  const ICON_HORIZONTAL_OFFSET = offsetBaseSize;
  const ICON_VERTICAL_OFFSET = offsetBaseSize;

  const TEXT_HORIZONTAL_OFFSET = offsetBaseSize * 1.5;
  const TEXT_VERTICAL_OFFSET = offsetBaseSize * 1.2;

  const directionToPositionPropsMap = {
    left: {
      iconProps: {
        right: ICON_HORIZONTAL_OFFSET,
      },
      textProps: {
        left: TEXT_HORIZONTAL_OFFSET,
      },
    },
    right: {
      iconProps: {
        left: ICON_HORIZONTAL_OFFSET,
      },
      textProps: {
        right: TEXT_HORIZONTAL_OFFSET,
      },
    },
  };

  return {
    ...directionToPositionPropsMap[direction],
    iconVerticalOffset: ICON_VERTICAL_OFFSET,
    textVerticalOffset: TEXT_VERTICAL_OFFSET,
  };
};
