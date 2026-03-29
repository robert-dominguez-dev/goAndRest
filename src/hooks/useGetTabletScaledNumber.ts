import { useTabletScale } from './useTabletScale.ts';
import { useCallback } from 'react';

export const useGetTabletScaledNumber = () => {
  const sizeScale = useTabletScale();

  return useCallback(
    (value: number) => Math.round(value * sizeScale),
    [sizeScale],
  );
};
