import { AppViewProps } from '../AppView.tsx';

export type CardColorProps = Pick<
  AppViewProps,
  'backgroundColorStatus' | 'borderColorStatus'
>;
