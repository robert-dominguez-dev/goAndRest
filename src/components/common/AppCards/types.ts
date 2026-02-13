import { AppViewProps } from '../AppView/AppView.tsx';

export type CardColorProps = Pick<
  AppViewProps,
  'backgroundColorStatus' | 'borderColorStatus'
>;
