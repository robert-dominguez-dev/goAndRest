import { useIsTablet } from './useIsTablet.ts';
import {
  MAX_ACTIVE_UI_WIDTH,
  TABLET_MAX_ACTIVE_UI_WIDTH_RATIO,
} from '../constants/common.ts';
import { useWindowDimensions } from 'react-native';

export const useMaxTabletActiveElementWidth = (): number | undefined => {
  const isTablet = useIsTablet();

  const { width } = useWindowDimensions();

  const maxTabletWidth: number = Math.min(
    width * TABLET_MAX_ACTIVE_UI_WIDTH_RATIO,
    MAX_ACTIVE_UI_WIDTH,
  );

  return isTablet ? maxTabletWidth : MAX_ACTIVE_UI_WIDTH;
};
