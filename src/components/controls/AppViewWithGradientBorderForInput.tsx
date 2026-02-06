import {
  AppViewWithGradientBorder,
  AppViewWithGradientBorderProps,
} from '../common/AppViewWithGradientBorder.tsx';
import { sizes } from '../../constants/ui.ts';
import { AppGradientColorUnion } from '../../constants/colors.ts';

export type AppViewWithGradientBorderForInputProps = Pick<
  AppViewWithGradientBorderProps,
  'children' | 'width' | 'height' | 'minHeight' | 'backgroundColorStatus'
> & { isInvalid?: boolean };

export const AppViewWithGradientBorderForInput = ({
  children,
  width,
  height,
  minHeight,
  backgroundColorStatus,
  isInvalid,
}: AppViewWithGradientBorderForInputProps) => {
  const gradientBorderColorStatus: AppGradientColorUnion = isInvalid
    ? 'negative'
    : 'primary';

  return (
    <AppViewWithGradientBorder
      backgroundColorStatus={backgroundColorStatus}
      gradientBorderColorStatus={gradientBorderColorStatus}
      width={width}
      height={height}
      minHeight={minHeight}
      paddingHorizontal={'s'}
      borderRadius={sizes.formFieldBorderRadius}>
      {children}
    </AppViewWithGradientBorder>
  );
};
