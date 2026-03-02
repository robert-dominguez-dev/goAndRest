import { memo } from 'react';
import { AppButton, AppButtonProps } from '../controls/AppButton/AppButton.tsx';
import { LucideIcon } from 'lucide-react-native';
import { useAppThemedColors } from '../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppColorUnion } from '../../types/ui.ts';

type AppDottedButtonProps = Pick<AppButtonProps, 'label' | 'onPress'> & {
  colorStatus?: AppColorUnion;
  AccessoryLeftIconComponent: LucideIcon;
  AccessoryRightIconComponent: LucideIcon;
};

const AppDottedButtonComponent = ({
  label,
  onPress,
  AccessoryLeftIconComponent,
  AccessoryRightIconComponent,
  colorStatus = 'text',
}: AppDottedButtonProps) => {
  const appColors = useAppThemedColors();

  return (
    <AppButton
      label={label}
      onPress={onPress}
      borderColorStatus={colorStatus}
      textColorStatus={colorStatus}
      IconComponent={AccessoryLeftIconComponent}
      backgroundColorStatus={'transparent'}
      borderStyle={'dotted'}
      value={
        <AccessoryRightIconComponent
          color={appColors[colorStatus]}
          size={categoryToIconSize.subHeader}
        />
      }
    />
  );
};

export const AppDottedButton = memo(AppDottedButtonComponent);
