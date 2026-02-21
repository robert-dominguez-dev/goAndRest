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
      const elapsedMsInCurrentSecond = new Date().getMilliseconds();
      const msToNextSecond = ONE_SECOND_MS - elapsedMsInCurrentSecond;
      timeoutIdRef.current = setTimeout(tick, msToNextSecond);
    };

    tick();

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [...deps, enabled]);
};
