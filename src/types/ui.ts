import { appColorsLight } from '../constants/colors.ts';
import { ViewStyle } from 'react-native';

export enum AppSize {
  xxs = 2,
  xs = 4,
  s = 8,
  m = 16,
  ml = 24,
  l = 32,
  xl = 48,
  xxl = 64,
  '3xl' = 80,
}

export type AppSizeUnion = keyof typeof AppSize | number;

export type AppColorUnion = keyof typeof appColorsLight;

export type AppTextCategoryUnion =
  | 'header'
  | 'subHeader'
  | 'title'
  | 'log'
  | 'content'
  | 'contentBold';

export type BorderProps = Pick<ViewStyle, 'borderColor' | 'borderWidth'>;

export type AppDimensions = {
  width: number;
  height: number;
};
