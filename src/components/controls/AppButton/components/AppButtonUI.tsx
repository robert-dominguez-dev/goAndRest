import { sizes } from '../../../../constants/ui.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppViewProps } from '../../../common/AppView/AppView.tsx';
import {
  AppButtonIconAndLabel,
  AppButtonIconAndLabelProps,
} from './AppButtonIconAndLabel.tsx';

const { configButtonSize, configButtonBorderRadius } = sizes;

export type AppButtonUIProps = AppButtonIconAndLabelProps &
  Pick<AppViewProps, 'opacity' | 'backgroundColorStatus'> & {
    value?: string;
  };

export const AppButtonUI = ({
  label,
  value,
  opacity,
  textColorStatus,
  backgroundColorStatus,
  IconComponent,
}: AppButtonUIProps) => {
  const labelTextAlign: AppTextProps['textAlign'] =
    !value && !IconComponent ? 'center' : undefined;

  return (
    <AppRow
      gap={'s'}
      paddingHorizontal={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}
      backgroundColorStatus={backgroundColorStatus}
      height={configButtonSize}
      borderRadius={configButtonBorderRadius}
      opacity={opacity}>
      <AppButtonIconAndLabel
        label={label}
        textColorStatus={textColorStatus}
        IconComponent={IconComponent}
        textAlign={labelTextAlign}
      />
      {!!value && (
        <AppText
          textAlign={'right'}
          category={'header'}
          colorStatus={textColorStatus}
          numberOfLines={1}>
          {value}
        </AppText>
      )}
    </AppRow>
  );
};
