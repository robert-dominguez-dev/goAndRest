import { FontCategoryStyle, fontCategoryStyles, } from '../../../../constants/fonts.ts';
import { AppTextCategoryUnion } from '../../../../types/ui.ts';
import { checkIsValidNumber } from '../../../../helpers/checkIsValidNumber.ts';
import { useMemo } from 'react';
import { useGetTabletScaledNumber } from '../../../../hooks/useGetTabletScaledNumber.ts';

export const useScaledTextCategoryStyle = (
  category: AppTextCategoryUnion,
): FontCategoryStyle => {
  const getTabletScaledNumber = useGetTabletScaledNumber();

  return useMemo(() => {
    const categoryStyle = fontCategoryStyles[category];

    const fontSize = getTabletScaledNumber(categoryStyle.fontSize);

    const lineHeight: number | undefined = checkIsValidNumber(
      categoryStyle.lineHeight,
    )
      ? getTabletScaledNumber(categoryStyle.lineHeight)
      : undefined;

    return {
      ...categoryStyle,
      fontSize,
      lineHeight,
    };
  }, [category, category, getTabletScaledNumber]);
};
