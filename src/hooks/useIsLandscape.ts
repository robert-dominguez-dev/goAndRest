import { useAppOrientation } from './useAppOrientation.tsx';

export const useIsLandscape = () => {
  const { appOrientation } = useAppOrientation();
  return appOrientation === 'LANDSCAPE';
};
