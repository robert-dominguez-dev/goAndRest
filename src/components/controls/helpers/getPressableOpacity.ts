import {
  ACTIVE_OPACITY,
  INACTIVE_OPACITY,
  PRESSED_OPACITY,
} from '../../../constants/ui.ts';

type GetPressableOpacityParams = {
  disabled: boolean | undefined;
  pressed: boolean | undefined;
};

export const getPressableOpacity = ({
  disabled,
  pressed,
}: GetPressableOpacityParams): number =>
  disabled ? INACTIVE_OPACITY : pressed ? PRESSED_OPACITY : ACTIVE_OPACITY;
