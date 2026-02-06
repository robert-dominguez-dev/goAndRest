import { AppAnimationView } from './AppAnimationView.tsx';
import { AppAnimation } from '../../assets/constants.ts';
import { AppButtonProps } from '../controls/AppButton/AppButton.tsx';
import { AppSizeUnion } from '../../types/ui.ts';
import { getAppSize } from '../../helpers/getAppSize.ts';

export type AppLoaderProps = Pick<AppButtonProps, 'isPending'> & {
  size?: AppSizeUnion;
};

export const AppLoader = ({ isPending, size = 'ml' }: AppLoaderProps) => {
  const sizeEvaluated = getAppSize(size);

  return (
    <AppAnimationView
      /**
       * Keep !!, it's important, because isPresent is true by default.
       */
      isPresent={!!isPending}
      resourceName={AppAnimation.loader}
      width={sizeEvaluated}
      height={sizeEvaluated}
    />
  );
};
