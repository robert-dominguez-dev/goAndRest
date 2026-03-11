import { DependencyList, useEffect, useRef } from 'react';
import { ONE_SECOND_MS } from '../constants/common.ts';

export const usePreciseInterval = (
  onTick: () => void,
  enabled: boolean,
  deps: DependencyList,
) => {
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    if (!enabled) {
      return undefined;
    }

    const tick = () => {
      onTick();
      timeoutIdRef.current = setTimeout(tick, ONE_SECOND_MS);
    };

    tick();

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [...deps, enabled]);
};
