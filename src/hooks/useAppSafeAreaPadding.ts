import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewStyle } from 'react-native';
import { AppSize } from '../types/ui.ts';

export const useAppSafeAreaPadding = () => {
  const { top, bottom } = useSafeAreaInsets();

  /**
   * Especially on Android the content on the bottom
   * is squeezed to the edge of the page,
   * when using just bottom safe area inset.
   */
  const paddingBottom = bottom + AppSize.m;

  return { paddingTop: top, paddingBottom } satisfies Pick<
    ViewStyle,
    'paddingTop' | 'paddingBottom'
  >;
};
