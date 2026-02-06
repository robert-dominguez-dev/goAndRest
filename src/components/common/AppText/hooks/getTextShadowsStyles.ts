import { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet';
import {
  AppColorUnion,
  AppDimensions,
  AppTextCategoryUnion,
} from '../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { sizes } from '../../../../constants/ui.ts';

const { textShadowSizeHeader, textShadowSizeContent } = sizes;

type TextShadowStyle = {
  textShadowColor: ColorValue | undefined;
  textShadowOffset: AppDimensions;
  textShadowRadius: number;
};

type UseTextShadowsStyleParams = {
  textCategory: AppTextCategoryUnion;
  textShadowColorStatus: AppColorUnion | undefined;
};

export const useTextShadowsStyle = ({
  textCategory,
  textShadowColorStatus,
}: UseTextShadowsStyleParams): TextShadowStyle | undefined => {
  const appColors = useAppThemedColors();

  if (!textShadowColorStatus) {
    return undefined;
  }

  const textShadowColor = appColors[textShadowColorStatus];

  const headerTextShadowStyle: TextShadowStyle = {
    textShadowColor,
    textShadowOffset: {
      width: textShadowSizeHeader,
      height: textShadowSizeHeader,
    },
    textShadowRadius: textShadowSizeHeader,
  };

  const contentTextShadowStyle: TextShadowStyle = {
    textShadowColor,
    textShadowOffset: {
      width: textShadowSizeContent,
      height: textShadowSizeContent,
    },
    textShadowRadius: textShadowSizeContent,
  };

  const categoryToTextShadowStyle = {
    header: headerTextShadowStyle,
    subHeader: headerTextShadowStyle,
    title: contentTextShadowStyle,
    content: contentTextShadowStyle,
    contentBold: contentTextShadowStyle,
    log: contentTextShadowStyle,
  } satisfies Record<AppTextCategoryUnion, TextShadowStyle>;

  return categoryToTextShadowStyle[textCategory];
};
