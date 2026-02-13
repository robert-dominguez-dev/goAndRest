import { View, ViewProps } from 'react-native';
import {
  useAppViewStyle,
  UseAppViewStyleParams,
} from './hooks/useAppViewStyle.ts';

export type AppViewProps = UseAppViewStyleParams &
  Pick<
    ViewProps,
    'children' | 'onLayout' | 'onTouchEnd' | 'onTouchStart' | 'onTouchMove'
  >;

export const AppView = ({
  children,
  onLayout,
  onTouchEnd,
  onTouchStart,
  onTouchMove,
  ...styleProps
}: AppViewProps) => {
  const style = useAppViewStyle(styleProps);

  return (
    <View
      style={style}
      onLayout={onLayout}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}>
      {children}
    </View>
  );
};
