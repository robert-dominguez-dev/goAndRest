import { memo } from 'react';
import { AppIcon, AppIconName } from '../../../../../common/AppIcon.tsx';
import {
  AppView,
  AppViewProps,
} from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../../../../../constants/common.ts';
import {
  RunningWorkoutSkipButtonDirection,
  useRunningWorkoutSkipButtonUIProps,
} from '../hooks/useRunningWorkoutSkipButtonUIProps.tsx';

const directionToIconNameMap: Record<
  RunningWorkoutSkipButtonDirection,
  AppIconName
> = {
  left: 'Undo2',
  right: 'Redo2',
};

export type RunningWorkoutSkipButtonUIProps = Pick<AppViewProps, 'opacity'> & {
  value: number;
  direction: RunningWorkoutSkipButtonDirection;
  iconSize: number;
  offsetBaseSize: number;
};

const RunningWorkoutSkipButtonUIComponent = ({
  value,
  direction,
  iconSize,
  opacity,
  offsetBaseSize,
}: RunningWorkoutSkipButtonUIProps) => {
  const { iconProps, textProps, iconVerticalOffset, textVerticalOffset } =
    useRunningWorkoutSkipButtonUIProps(direction, offsetBaseSize);

  const iconName = directionToIconNameMap[direction];

  return (
    <AppView
      grow
      opacity={opacity}
      width={FILL_CONTAINER_DIMENSION}
      position={'relative'}>
      <AppView
        position={'absolute'}
        top={iconVerticalOffset}
        {...iconProps}>
        <AppIcon
          name={iconName}
          size={iconSize}
        />
      </AppView>
      <AppView
        position={'absolute'}
        bottom={textVerticalOffset}
        {...textProps}>
        <AppText category={'contentBold'}>{value}</AppText>
      </AppView>
    </AppView>
  );
};

export const RunningWorkoutSkipButtonUI = memo(
  RunningWorkoutSkipButtonUIComponent,
);
