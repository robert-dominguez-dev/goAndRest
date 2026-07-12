import { Platform, TextStyle } from 'react-native';
import {
  AppColorUnion,
  AppSizeUnion,
  AppTextCategoryUnion,
} from '../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { useTextShadowsStyle } from './getTextShadowsStyles.ts';
import { getAppSize } from '../../../../helpers/getAppSize.ts';
import { useScaledTextCategoryStyle } from './useScaledTextCategoryStyle.ts';

export type UseAppTextStyleParams = Pick<TextStyle, 'textAlign'> & {
  category?: AppTextCategoryUnion;
  colorStatus?: AppColorUnion;
  grow?: boolean;
  shrink?: boolean;
  textShadowColorStatus?: AppColorUnion;
  fontSizeOverride?: AppSizeUnion;
  lineHeightMultiplier?: number;
  colorOverride?: string;
  marginCorrection?: number;
};

export const useAppTextStyle = ({
  textAlign,
  textShadowColorStatus,
  fontSizeOverride,
  colorOverride,
  lineHeightMultiplier = 1,
  marginCorrection = 0,
  category = 'content',
  colorStatus = 'text',
  grow = true,
  shrink = true,
}: UseAppTextStyleParams): TextStyle => {
  const appColors = useAppThemedColors();

  const textShadowStyles = useTextShadowsStyle({
    textCategory: category,
    textShadowColorStatus,
  });

  const textCategoryStyle = useScaledTextCategoryStyle(category);

  const fontSizeOverrideEvaluated = getAppSize(fontSizeOverride);

  const fontSizeOverrideProps: Pick<
    TextStyle,
    'fontSize' | 'lineHeight' | 'textAlignVertical'
  > = fontSizeOverrideEvaluated
    ? {
        fontSize: fontSizeOverrideEvaluated,
        lineHeight: fontSizeOverrideEvaluated * lineHeightMultiplier,
      }
    : {};

  const marginTop = Platform.select<number>({
    ios: marginCorrection,
    android: -marginCorrection,
  });

  const marginBottom = Platform.select<number>({
    ios: -marginCorrection,
    android: marginCorrection,
  });

  return {
    ...textCategoryStyle,
    ...textShadowStyles,
    ...fontSizeOverrideProps,
    textAlign,
    marginTop,
    marginBottom,
    color: colorOverride || appColors[colorStatus],
    flexGrow: Number(grow),
    flexShrink: Number(shrink),
  };
};
