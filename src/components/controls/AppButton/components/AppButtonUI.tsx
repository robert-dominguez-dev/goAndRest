import { sizes } from '../../../../constants/ui.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppViewProps } from '../../../common/AppView/AppView.tsx';
import { AppIconAndLabel, AppIconAndLabelProps } from './AppIconAndLabel.tsx';
import { JSX } from 'react';
import { useGetTabletScaledNumber } from '../../../../hooks/useGetTabletScaledNumber.ts';

const { configButtonSize, configButtonBorderRadius } = sizes;

export type AppButtonUIProps = AppIconAndLabelProps &
  Pick<
    AppViewProps,
    'opacity' | 'backgroundColorStatus' | 'borderColorStatus' | 'borderStyle'
  > & {
    value?: string | JSX.Element;
  };

export const AppButtonUI = ({
  label,
  value,
  opacity,
  textColorStatus,
  backgroundColorStatus,
  borderColorStatus,
  borderStyle,
  iconName,
  category = 'header',
}: AppButtonUIProps) => {
  const getTabletScaledNumber = useGetTabletScaledNumber();

  const height = getTabletScaledNumber(configButtonSize);
  const borderRadius = getTabletScaledNumber(configButtonBorderRadius);

  const labelTextAlign: AppTextProps['textAlign'] =
    !value && !iconName ? 'center' : undefined;

  const valueElement: JSX.Element | undefined =
    typeof value === 'string' ? (
      <AppText
        textAlign={'right'}
        category={category}
        colorStatus={textColorStatus}
        numberOfLines={1}>
        {value}
      </AppText>
    ) : (
      value
    );

  return (
    <AppRow
      gap={'s'}
      paddingHorizontal={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderColorStatus={borderColorStatus}
      backgroundColorStatus={backgroundColorStatus}
      borderStyle={borderStyle}
      height={height}
      borderRadius={borderRadius}
      opacity={opacity}>
      <AppIconAndLabel
        label={label.toUpperCase()}
        textColorStatus={textColorStatus}
        iconName={iconName}
        textAlign={labelTextAlign}
        category={category}
      />
      {valueElement}
    </AppRow>
  );
};
