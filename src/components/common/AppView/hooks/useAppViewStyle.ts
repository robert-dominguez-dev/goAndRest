import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import {
  AppColorUnion,
  AppSizeUnion,
  BorderProps,
  ShadowProps,
} from '../../../../types/ui.ts';
import { sizes } from '../../../../constants/ui.ts';
import { ViewStyle } from 'react-native';
import { getAppSize } from '../../../../helpers/getAppSize.ts';

export type UseAppViewStyleParams = Pick<
  ViewStyle,
  | 'height'
  | 'width'
  | 'position'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'alignSelf'
  | 'alignItems'
  | 'justifyContent'
  | 'flexDirection'
  | 'flexWrap'
  | 'flexBasis'
  | 'minHeight'
  | 'maxHeight'
  | 'minWidth'
  | 'maxWidth'
  | 'zIndex'
  | 'pointerEvents'
  | 'opacity'
  | 'borderStyle'
  | 'overflow'
> & {
  borderWidthOverride?: AppSizeUnion;
  backgroundColorStatus?: AppColorUnion;
  borderColorStatus?: AppColorUnion;
  shadowColorStatus?: AppColorUnion;
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

export const useAppViewStyle = ({
  width,
  height,
  position,
  top,
  bottom,
  left,
  right,
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
  flexBasis,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  zIndex,
  pointerEvents,
  opacity,
  borderStyle,
  overflow,
  borderWidthOverride,
  backgroundColorStatus,
  borderColorStatus,
  shadowColorStatus,
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
}: UseAppViewStyleParams): ViewStyle => {
  const appColors = useAppThemedColors();

  const borderProps: BorderProps | undefined = borderColorStatus
    ? {
        borderColor: appColors[borderColorStatus],
        borderWidth:
          getAppSize(borderWidthOverride) ?? sizes.defaultBorderWidth,
      }
    : undefined;

  const shadowProps: ShadowProps | undefined = shadowColorStatus
    ? {
        shadowColor: appColors[shadowColorStatus],
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3,
      }
    : undefined;

  return {
    ...borderProps,
    ...shadowProps,
    width,
    height,
    position,
    top,
    bottom,
    left,
    right,
    alignSelf,
    alignItems,
    justifyContent,
    flexDirection,
    flexWrap,
    flexBasis,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    zIndex,
    pointerEvents,
    opacity,
    borderStyle,
    overflow,
    backgroundColor: backgroundColorStatus
      ? appColors[backgroundColorStatus]
      : undefined,
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
    flexGrow: Number(grow),
    flexShrink: Number(shrink),
  };
};
