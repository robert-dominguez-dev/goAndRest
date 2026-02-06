import { AppGradientColorUnion, AppSize } from '../../../../types/ui.ts';
import { AppText } from '../../../common/AppText/AppText.tsx';
import { sizes } from '../../../../constants/ui.ts';
import { AppViewWithGradientBorder } from '../../../common/AppViewWithGradientBorder.tsx';
import { AppButtonDisabledDependentProps } from '../types.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppLoader } from '../../../common/AppLoader.tsx';

const { buttonHeight, buttonBorderRadius } = sizes;

export type AppButtonUIProps = AppButtonDisabledDependentProps & {
  status: AppGradientColorUnion;
  isPending?: boolean;
};

export const AppButtonUI = ({
  label,
  textColorStatus,
  backgroundColorStatus,
  isPending,
  status,
}: AppButtonUIProps) => {
  return (
    <AppViewWithGradientBorder
      gradientBorderColorStatus={status}
      height={buttonHeight}
      backgroundColorStatus={backgroundColorStatus}
      borderRadius={buttonBorderRadius}>
      <AppRow
        gap={AppSize.s}
        alignItems={'center'}
        justifyContent={'center'}>
        <AppText
          grow={!isPending}
          textAlign={'center'}
          category={'header'}
          colorStatus={textColorStatus}>
          {label}
        </AppText>
        <AppLoader isPending={isPending} />
      </AppRow>
    </AppViewWithGradientBorder>
  );
};
