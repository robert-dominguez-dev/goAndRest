import { ReactNode } from 'react';

export type ChildrenProp = { children: ReactNode };

export type CloneRequiredKeys<T, TValue> = {
  [K in keyof T as T extends Record<K, T[K]> ? K : never]: TValue;
};
