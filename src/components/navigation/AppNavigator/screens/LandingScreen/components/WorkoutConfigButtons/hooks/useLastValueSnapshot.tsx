import { useRef } from 'react';

export const useLastValueSnapshot = (onChange: (value: number) => void) => {
  const lastValueRef = useRef<number>(null);

  const takeSnapshot = (lastValue: number) => {
    lastValueRef.current = lastValue;
  };

  const clearSnapshot = () => {
    lastValueRef.current = null;
  };

  const revertChanges = () => {
    if (lastValueRef.current !== null) {
      onChange(lastValueRef.current);
    }

    clearSnapshot();
  };

  return { takeSnapshot, clearSnapshot, revertChanges };
};
