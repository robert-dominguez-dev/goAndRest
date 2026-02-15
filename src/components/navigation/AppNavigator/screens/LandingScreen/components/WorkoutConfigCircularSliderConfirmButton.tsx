import { memo } from 'react';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { getAppRoundedButtonUIProps } from '../../../../../controls/AppRoundedButton/helpers/getAppRoundedButtonUIProps.ts';
import { Pressable } from 'react-native';
import { Save } from 'lucide-react-native';
import {
  AppRoundedButtonSizeUnion,
  roundedButtonToIconSize,
} from '../../../../../controls/AppRoundedButton/constants.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const ROUNDED_BUTTON_SIZE: AppRoundedButtonSizeUnion = 'l';

export type WorkoutConfigCircularSliderConfirmButtonProps = {
  onPress: () => void;
};

const WorkoutConfigCircularSliderConfirmButtonComponent = ({
  onPress,
}: WorkoutConfigCircularSliderConfirmButtonProps) => {
  const { text } = useAppThemedColors();

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(
        onPress,
        HapticFeedbackTypes.selection,
      )}>
      {({ pressed }) => {
        const { width, height, borderRadius, opacity } =
          getAppRoundedButtonUIProps({
            pressed,
            size: ROUNDED_BUTTON_SIZE,
            status: 'slider',
          });

        return (
          <AppView
            opacity={opacity}
            width={width}
            height={height}
            borderRadius={borderRadius}
            borderStyle={'dotted'}
            borderColorStatus={'text'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Save
              color={text}
              size={roundedButtonToIconSize[ROUNDED_BUTTON_SIZE]}
            />
          </AppView>
        );
      }}
    </Pressable>
  );
};

export const WorkoutConfigCircularSliderConfirmButton = memo(
  WorkoutConfigCircularSliderConfirmButtonComponent,
);
