import { AppView } from '../../common/AppView/AppView.tsx';
import { ChildrenProp } from '../../../types/common.ts';
import { AppViewWithGradientBorder } from '../../common/AppViewWithGradientBorder.tsx';
import {
  getAppRoundedButtonUIProps,
  GetAppRoundedButtonUIPropsParams,
} from './helpers/getAppRoundedButtonUIProps.ts';
import { useGetTabletScaledNumber } from '../../../hooks/useGetTabletScaledNumber.ts';

export type AppRoundedButtonUIProps = ChildrenProp &
  GetAppRoundedButtonUIPropsParams;

export const AppRoundedButtonUI = ({
  children,
  ...props
}: AppRoundedButtonUIProps) => {
  const { width, height, borderRadius, backgroundColorStatus, opacity } =
    getAppRoundedButtonUIProps(props);

  const getTabletScaledNumber = useGetTabletScaledNumber();

  const widthEvaluated = getTabletScaledNumber(width);
  const heightEvaluated = getTabletScaledNumber(height);
  const borderRadiusEvaluated = getTabletScaledNumber(borderRadius);

  return (
    <AppViewWithGradientBorder
      width={widthEvaluated}
      height={heightEvaluated}
      borderRadius={borderRadiusEvaluated}
      opacity={opacity}
      gradientBorderColorStatus={props.status}>
      <AppView
        width={widthEvaluated}
        height={heightEvaluated}
        borderRadius={borderRadiusEvaluated}
        backgroundColorStatus={backgroundColorStatus}
        alignItems={'center'}
        justifyContent={'center'}>
        {children}
      </AppView>
    </AppViewWithGradientBorder>
  );
};
