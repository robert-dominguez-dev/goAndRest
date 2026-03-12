import { memo } from 'react';
import { LucideIcon, Redo2, Undo2 } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import {
  AppView,
  AppViewProps,
} from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { FILL_CONTAINER_DIMENSION } from '../../../../../../constants/common.ts';

const ICON_HORIZONTAL_OFFSET = 12;
const ICON_VERTICAL_OFFSET = 12;

const TEXT_HORIZONTAL_OFFSET = 18;
const TEXT_VERTICAL_OFFSET = 14;

type RunningWorkoutSkipButtonDirection = 'left' | 'right';

type HorizontalPositionProps = Pick<AppViewProps, 'left' | 'right'>;

type DependentHorizontalPositionProps = {
  iconProps: HorizontalPositionProps;
  textProps: HorizontalPositionProps;
};

const directionToPositionPropsMap: Record<
  RunningWorkoutSkipButtonDirection,
  DependentHorizontalPositionProps
> = {
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

const directionToIconMap: Record<
  RunningWorkoutSkipButtonDirection,
  LucideIcon
> = {
  left: Undo2,
  right: Redo2,
};

export type RunningWorkoutSkipButtonUIProps = Pick<AppViewProps, 'opacity'> & {
  value: number;
  direction: RunningWorkoutSkipButtonDirection;
  iconSize: number;
};

const RunningWorkoutSkipButtonUIComponent = ({
  value,
  direction,
  iconSize,
  opacity,
}: RunningWorkoutSkipButtonUIProps) => {
  const { text } = useAppThemedColors();

  const { iconProps, textProps } = directionToPositionPropsMap[direction];

  const IconComponent = directionToIconMap[direction];

  return (
    <AppView
      grow
      opacity={opacity}
      width={FILL_CONTAINER_DIMENSION}
      position={'relative'}>
      <AppView
        position={'absolute'}
        top={ICON_VERTICAL_OFFSET}
        {...iconProps}>
        <IconComponent
          size={iconSize}
          color={text}
        />
      </AppView>
      <AppView
        position={'absolute'}
        bottom={TEXT_VERTICAL_OFFSET}
        {...textProps}>
        <AppText category={'contentBold'}>{value}</AppText>
      </AppView>
    </AppView>
  );
};

export const RunningWorkoutSkipButtonUI = memo(
  RunningWorkoutSkipButtonUIComponent,
);
