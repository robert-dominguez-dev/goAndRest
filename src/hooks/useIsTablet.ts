import { useWindowDimensions } from 'react-native';

const TABLET_SMALLEST_SIZE_DP = 600;

export const useIsTablet = () => {
  const { width, height } = useWindowDimensions();
  return Math.min(width, height) >= TABLET_SMALLEST_SIZE_DP;
};
