import { useAtom, WritableAtom } from 'jotai';
import { useEffect, useState } from 'react';

export type DebouncedAtom<TValue> = WritableAtom<
  TValue | Promise<TValue>,
  [TValue],
  unknown
>;

export const useDebouncedAtom = <TValue>(
  atom: DebouncedAtom<TValue>,
  delay = 200,
): [TValue, (value: TValue) => void] => {
  const [storedValue, setStoredValue] = useAtom(atom);
  const [localValue, setLocalValue] = useState<TValue>(storedValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('DEBOUNCE');
      setStoredValue(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, delay, setStoredValue]);

  return [localValue, setLocalValue];
};
