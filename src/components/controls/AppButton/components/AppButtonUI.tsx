import { sizes } from '../../../../constants/ui.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppViewProps } from '../../../common/AppView/AppView.tsx';
import {
  AppButtonIconAndLabel,
  AppButtonIconAndLabelProps,
} from './AppButtonIconAndLabel.tsx';
import { JSX } from 'react';

const { configButtonSize, configButtonBorderRadius } = sizes;

export type AppButtonUIProps = AppButtonIconAndLabelProps &
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
  IconComponent,
  category = 'header',
}: AppButtonUIProps) => {
  const labelTextAlign: AppTextProps['textAlign'] =
    !value && !IconComponent ? 'center' : undefined;

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
      height={configButtonSize}
      borderRadius={configButtonBorderRadius}
      opacity={opacity}>
      <AppButtonIconAndLabel
        label={label}
        textColorStatus={textColorStatus}
        IconComponent={IconComponent}
        textAlign={labelTextAlign}
        category={category}
      />
      {valueElement}
    </AppRow>
  );
};
