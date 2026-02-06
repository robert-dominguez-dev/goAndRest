import { DependencyList, useEffect, useRef } from 'react';

export const usePreciseTimeout = (
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
      const msToNextSecond = 1000 - elapsedMsInCurrentSecond;
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
