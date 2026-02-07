import { Switch, SwitchProps } from 'react-native';
import { useAppThemedColors } from '../../hooks/useAppThemedColors.ts';

type AppToggleProps = Pick<SwitchProps, 'value' | 'onValueChange'>;

export const AppToggle = ({ value, onValueChange }: AppToggleProps) => {
  const { backgroundAlt, background, primary } = useAppThemedColors();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: backgroundAlt,
        true: primary,
      }}
      thumbColor={background}
    />
  );
};
