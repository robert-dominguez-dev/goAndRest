import { appColorsLight } from '../constants/colors.ts';
import { ViewStyle } from 'react-native';

export enum AppSize {
  xxs = 2,
  xs = 4,
  s = 8,
  sm = 12,
  m = 16,
  ml = 24,
  l = 32,
  xl = 48,
  xxl = 64,
  '3xl' = 80,
}

export type AppSizeUnion = keyof typeof AppSize | number;

export type AppColorUnion = keyof typeof appColorsLight;

export type AppTextCategoryUnion = 'header' | 'subHeader' | 'title' | 'content';

export type BorderProps = Pick<ViewStyle, 'borderColor' | 'borderWidth'>;

export type ShadowProps = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOpacity'
  | 'shadowOffset'
  | 'shadowRadius'
  | 'elevation'
>;

export type AppDimensions = {
  width: number;
  height: number;
};
