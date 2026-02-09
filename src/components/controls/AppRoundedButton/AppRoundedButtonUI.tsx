import { AppView } from '../../common/AppView.tsx';
import { ChildrenProp } from '../../../types/common.ts';
import { AppViewWithGradientBorder } from '../../common/AppViewWithGradientBorder.tsx';
import {
  getAppRoundedButtonUIProps,
  GetAppRoundedButtonUIPropsParams,
} from './helpers/getAppRoundedButtonUIProps.ts';

export type AppRoundedButtonUIProps = ChildrenProp &
  GetAppRoundedButtonUIPropsParams;

export const AppRoundedButtonUI = ({
  children,
  ...props
}: AppRoundedButtonUIProps) => {
  const { width, height, borderRadius, backgroundColorStatus, opacity } =
    getAppRoundedButtonUIProps(props);

  return (
    <AppViewWithGradientBorder
      width={width}
      height={height}
      borderRadius={borderRadius}
      opacity={opacity}
      gradientBorderColorStatus={props.status}>
      <AppView
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColorStatus={backgroundColorStatus}
        alignItems={'center'}
        justifyContent={'center'}>
        {children}
      </AppView>
    </AppViewWithGradientBorder>
  );
};
