import { TextStyle } from 'react-native';
import {
  AppColorUnion,
  AppSizeUnion,
  AppTextCategoryUnion,
} from '../../../../types/ui.ts';
import { fontCategoryStyles } from '../../../../constants/fonts.ts';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { useTextShadowsStyle } from './getTextShadowsStyles.ts';
import { getAppSize } from '../../../../helpers/getAppSize.ts';

export type UseAppTextStyleParams = Pick<TextStyle, 'textAlign'> & {
  category?: AppTextCategoryUnion;
  colorStatus?: AppColorUnion;
  grow?: boolean;
  shrink?: boolean;
  textShadowColorStatus?: AppColorUnion;
  fontSizeOverride?: AppSizeUnion;
  colorOverride?: string;
};

export const useAppTextStyle = ({
  textAlign,
  textShadowColorStatus,
  fontSizeOverride,
  colorOverride,
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

  const fontSizeOverrideEvaluated = getAppSize(fontSizeOverride);

  const fontSizeOverrideProps: Pick<
    TextStyle,
    'fontSize' | 'lineHeight' | 'textAlignVertical'
  > = fontSizeOverrideEvaluated
    ? {
        fontSize: fontSizeOverrideEvaluated,
        lineHeight: fontSizeOverrideEvaluated,
      }
    : {};

  return {
    ...fontCategoryStyles[category],
    ...textShadowStyles,
    ...fontSizeOverrideProps,
    textAlign,
    color: colorOverride || appColors[colorStatus],
    flexGrow: Number(grow),
    flexShrink: Number(shrink),
  };
};
