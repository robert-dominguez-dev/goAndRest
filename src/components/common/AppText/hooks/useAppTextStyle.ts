import { TextStyle } from 'react-native';
import { AppColorUnion, AppTextCategoryUnion } from '../../../../types/ui.ts';
import { fontCategoryStyles } from '../../../../constants/fonts.ts';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { useTextShadowsStyle } from './getTextShadowsStyles.ts';

export type UseAppTextStyleParams = Pick<TextStyle, 'textAlign'> & {
  category?: AppTextCategoryUnion;
  colorStatus?: AppColorUnion;
  grow?: boolean;
  shrink?: boolean;
  textShadowColorStatus?: AppColorUnion;
};

export const useAppTextStyle = ({
  textAlign,
  textShadowColorStatus,
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

  return {
    ...fontCategoryStyles[category],
    ...textShadowStyles,
    textAlign,
    color: appColors[colorStatus],
    flexGrow: Number(grow),
    flexShrink: Number(shrink),
  };
};
