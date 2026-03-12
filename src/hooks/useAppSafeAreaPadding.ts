import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppSize } from '../types/ui.ts';

export const useAppSafeAreaPadding = () => {
  const { top, bottom, left, right } = useSafeAreaInsets();

  /**
   * Especially on Android, the content
   * is squeezed to the edge of the page,
   * when using just bottom safe area inset.
   */
  const safeAreaPaddingTop = top + AppSize.m;
  const safeAreaPaddingBottom = bottom + AppSize.m;

  return {
    safeAreaPaddingTop,
    safeAreaPaddingBottom,
    safeAreaPaddingLeft: Math.max(AppSize.m, left),
    safeAreaPaddingRight: Math.max(AppSize.m, left),
  };
};
