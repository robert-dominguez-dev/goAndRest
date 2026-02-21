import { DependencyList, useEffect, useRef } from 'react';
import { ONE_SECOND_MS } from '../constants/common.ts';
import { countPreciseInterval } from '../helpers/countPreciseInterval.ts';

export const usePreciseInterval = (
  onTick: () => void,
  enabled: boolean,
  deps: DependencyList,
) => {
  const timeoutIdRef = useRef<number | null>(null);
  const tickCountRef = useRef(0);

  useEffect(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    if (!enabled) {
      return undefined;
    }

    const tick = () => {
      tickCountRef.current += 1;
      onTick();

      const isCorrectionThreshold = tickCountRef.current % 15 === 0;

      const currentInterval = isCorrectionThreshold
        ? countPreciseInterval()
        : ONE_SECOND_MS;

      timeoutIdRef.current = setTimeout(tick, currentInterval);
    };

    tick();

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [...deps, enabled]);
};
