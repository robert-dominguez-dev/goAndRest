import { ReactNode } from 'react';

export type ChildrenProp = { children: ReactNode };

export type PrimitiveValue = string | number | boolean;

export enum AppTheme {
  light = 'light',
  dark = 'dark',
}

export type AppOrientation = 'PORTRAIT' | 'LANDSCAPE';

export enum TabletScaleStep {
  small = 600,
  medium = 800,
  large = 1000,
}
