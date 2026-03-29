import { memo } from 'react';
import { AppButton, AppButtonProps } from '../controls/AppButton/AppButton.tsx';
import { AppIcon, AppIconName } from './AppIcon.tsx';
import { AppColorUnion } from '../../types/ui.ts';

type AppDottedButtonProps = Pick<AppButtonProps, 'label' | 'onPress'> & {
  colorStatus?: AppColorUnion;
  accessoryLeftIconName: AppIconName;
  accessoryRightIconName: AppIconName;
};

const AppDottedButtonComponent = ({
  label,
  onPress,
  accessoryLeftIconName,
  accessoryRightIconName,
  colorStatus = 'text',
}: AppDottedButtonProps) => {
  return (
    <AppButton
      label={label}
      onPress={onPress}
      borderColorStatus={colorStatus}
      textColorStatus={colorStatus}
      iconName={accessoryLeftIconName}
      backgroundColorStatus={'transparent'}
      borderStyle={'dotted'}
      value={
        <AppIcon
          name={accessoryRightIconName}
          colorStatus={colorStatus}
        />
      }
    />
  );
};

export const AppDottedButton = memo(AppDottedButtonComponent);
