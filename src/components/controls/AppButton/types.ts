import { AppViewWithGradientBorderProps } from '../../common/AppViewWithGradientBorder.tsx';
import { AppColorUnion } from '../../../types/ui.ts';

export type AppButtonDisabledDependentProps = Pick<
  AppViewWithGradientBorderProps,
  'backgroundColorStatus'
> & { label: string; textColorStatus: AppColorUnion };
