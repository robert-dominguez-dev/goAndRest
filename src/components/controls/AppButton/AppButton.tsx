import { Pressable, PressableProps } from 'react-native';

import { AppButtonUI, AppButtonUIProps } from './components/AppButtonUI.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { getPressableOpacity } from '../helpers/getPressableOpacity.ts';

export type AppButtonProps = Pick<
  AppButtonUIProps,
  | 'label'
  | 'value'
  | 'backgroundColorStatus'
  | 'borderColorStatus'
  | 'borderStyle'
  | 'iconName'
  | 'category'
  | 'textColorStatus'
> & { onPress?: () => void; onDisabledPress?: () => void; disabled?: boolean };

export const AppButton = ({
  label,
  value,
  onPress,
  onDisabledPress,
  disabled,
  iconName,
  borderColorStatus,
  borderStyle,
  category = 'subHeader',
  textColorStatus = 'text',
  backgroundColorStatus = 'primary',
}: AppButtonProps) => {
  const handlePress: PressableProps['onPress'] = disabled
    ? onDisabledPress
    : onPress;

  return (
    <Pressable onPress={getOnPressWithHapticFeedbackConditionally(handlePress)}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          disabled,
          pressed,
        });

        return (
          <AppButtonUI
            label={label}
            value={value}
            opacity={opacity}
            backgroundColorStatus={backgroundColorStatus}
            borderColorStatus={borderColorStatus}
            borderStyle={borderStyle}
            iconName={iconName}
            category={category}
            textColorStatus={textColorStatus}
          />
        );
      }}
    </Pressable>
  );
};
