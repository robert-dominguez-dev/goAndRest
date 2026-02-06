import { Animated, ViewStyle } from 'react-native';

import {
  FILL_CONTAINER_DIMENSION,
  POP_UP_Z_INDEX,
} from '../../constants/common.ts';
import { appColorsLight } from '../../constants/colors.ts';
import { ChildrenProp } from '../../types/common.ts';

type AppBackdropProps = ChildrenProp & Pick<ViewStyle, 'justifyContent'>;

export const AppBackdrop = ({
  children,
  justifyContent = 'center',
}: AppBackdropProps) => {
  const backdropStyle: ViewStyle = {
    justifyContent,
    position: 'absolute',
    backgroundColor: appColorsLight.semiTransparentOverlay,
    width: FILL_CONTAINER_DIMENSION,
    height: FILL_CONTAINER_DIMENSION,
    zIndex: POP_UP_Z_INDEX,
  };

  return <Animated.View style={backdropStyle}>{children}</Animated.View>;
};
