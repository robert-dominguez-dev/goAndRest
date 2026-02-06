import { useEffect, useRef } from 'react';

export const useConditionalTimeout = (
  callback: () => void,
  delay: number | undefined,
  enabled: boolean,
) => {
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    if (!enabled || !delay) {
      return undefined;
    }

    timeoutIdRef.current = setTimeout(callback, delay);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [callback, delay, enabled]);
};
