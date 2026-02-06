import { View, ViewProps, ViewStyle } from 'react-native';
import { AppColorUnion, AppSizeUnion, BorderProps } from '../../types/ui.ts';
import { getAppSize } from '../../helpers/getAppSize.ts';
import { getAppColor } from '../../helpers/getAppColor.ts';
import { convertBooleanToBinary } from '../../helpers/convertBooleanToBinary.ts';
import { sizes } from '../../constants/ui.ts';

export type AppViewProps = Pick<
  ViewProps,
  'children' | 'onLayout' | 'onTouchEnd' | 'onTouchStart' | 'onTouchMove'
> &
  Pick<
    ViewStyle,
    | 'height'
    | 'width'
    | 'position'
    | 'top'
    | 'bottom'
    | 'left'
    | 'alignSelf'
    | 'alignItems'
    | 'justifyContent'
    | 'flexDirection'
    | 'flexWrap'
    | 'minHeight'
    | 'maxHeight'
    | 'maxWidth'
    | 'zIndex'
    | 'pointerEvents'
    | 'opacity'
  > & {
    backgroundColorStatus?: AppColorUnion;
    borderColorStatus?: AppColorUnion;
    disableBorderBottom?: boolean;
    margin?: AppSizeUnion;
    padding?: AppSizeUnion;
    paddingHorizontal?: AppSizeUnion;
    paddingVertical?: AppSizeUnion;
    paddingTop?: AppSizeUnion;
    paddingBottom?: AppSizeUnion;
    paddingLeft?: AppSizeUnion;
    paddingRight?: AppSizeUnion;
    gap?: AppSizeUnion;
    borderRadius?: AppSizeUnion;
    borderTopLeftRadius?: AppSizeUnion;
    borderTopRightRadius?: AppSizeUnion;
    grow?: boolean;
    shrink?: boolean;
  };

export const AppView = ({
  children,
  onLayout,
  onTouchEnd,
  onTouchStart,
  onTouchMove,
  width,
  height,
  position,
  top,
  bottom,
  left,
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
  minHeight,
  maxHeight,
  maxWidth,
  zIndex,
  pointerEvents,
  opacity,
  backgroundColorStatus,
  borderColorStatus,
  disableBorderBottom,
  margin,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  gap,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  grow,
  shrink,
}: AppViewProps) => {
  const borderProps: BorderProps | undefined = borderColorStatus
    ? {
        borderColor: getAppColor(borderColorStatus),
        borderWidth: sizes.defaultBorderWidth,
      }
    : undefined;

  const style: ViewStyle = {
    ...borderProps,
    width,
    height,
    position,
    top,
    bottom,
    left,
    alignSelf,
    alignItems,
    justifyContent,
    flexDirection,
    flexWrap,
    minHeight,
    maxHeight,
    maxWidth,
    zIndex,
    pointerEvents,
    opacity,
    backgroundColor: getAppColor(backgroundColorStatus),
    margin: getAppSize(margin),
    padding: getAppSize(padding),
    paddingHorizontal: getAppSize(paddingHorizontal),
    paddingVertical: getAppSize(paddingVertical),
    paddingTop: getAppSize(paddingTop),
    paddingBottom: getAppSize(paddingBottom),
    paddingLeft: getAppSize(paddingLeft),
    paddingRight: getAppSize(paddingRight),
    gap: getAppSize(gap),
    borderRadius: getAppSize(borderRadius),
    borderTopLeftRadius: getAppSize(borderTopLeftRadius),
    borderTopRightRadius: getAppSize(borderTopRightRadius),
    borderBottomWidth: disableBorderBottom ? 0 : undefined,
    flexGrow: convertBooleanToBinary(grow),
    flexShrink: convertBooleanToBinary(shrink),
  };

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
