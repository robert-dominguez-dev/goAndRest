import { useIsTablet } from './useIsTablet.ts';
import { useIsLandscape } from './useIsLandscape.ts';

export const useIsTabletAndLandscape = (): boolean => {
  const isTablet = useIsTablet();
  const isLandscape = useIsLandscape();
  return isTablet && isLandscape;
};
