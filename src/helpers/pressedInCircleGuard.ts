import { GestureResponderEvent } from 'react-native';

type PressedInCircleGuardParams = {
  radius: number;
  onInsidePress: () => void;
  onOutsidePress?: () => void;
};

export const pressedInCircleGuard = (
  event: GestureResponderEvent,
  { radius, onInsidePress, onOutsidePress }: PressedInCircleGuardParams,
) => {
  const { locationX, locationY } = event.nativeEvent;

  const distance = Math.sqrt(
    Math.pow(locationX - radius, 2) + Math.pow(locationY - radius, 2),
  );

  const isPressInsideCircle = distance <= radius;

  if (isPressInsideCircle) {
    onInsidePress();
  } else {
    onOutsidePress?.();
  }
};
