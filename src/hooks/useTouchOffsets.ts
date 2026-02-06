import { useMemo, useState } from 'react';
import { GestureResponderEvent } from 'react-native';

type TouchOffsets = {
  x: number;
  y: number;
};

export const useTouchOffsets = () => {
  const [touchOffsets, setTouchOffsets] = useState<TouchOffsets | undefined>(
    undefined,
  );
  const handleTouchEvent = (event: GestureResponderEvent) => {
    setTouchOffsets({
      x: Math.round(event.nativeEvent.pageX),
      y: Math.round(event.nativeEvent.pageY),
    });
  };

  return useMemo(() => ({ handleTouchEvent, touchOffsets }), [touchOffsets]);
};
