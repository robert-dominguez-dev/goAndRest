import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppSize } from '../types/ui.ts';

export const useAppSafeAreaPadding = () => {
  const { top, bottom } = useSafeAreaInsets();

  /**
   * Especially on Android, the content on the bottom
   * is squeezed to the edge of the page,
   * when using just bottom safe area inset.
   */
  const safeAreaPaddingBottom = bottom + AppSize.m;

  return { safeAreaPaddingTop: top, safeAreaPaddingBottom };
};
