import { ReactNode } from 'react';

export type ChildrenProp = { children: ReactNode };

export type PrimitiveValue = string | number | boolean;

export enum AppTheme {
  light = 'light',
  dark = 'dark',
}
