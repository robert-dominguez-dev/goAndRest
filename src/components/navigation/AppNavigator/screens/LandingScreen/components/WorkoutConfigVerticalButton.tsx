import { workoutSettingsButtonConfigMap } from '../constants.ts';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { WorkoutConfigButtonProps } from '../types.ts';
import { Pressable } from 'react-native';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { sizes } from '../../../../../../constants/ui.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';

const { configButtonSize, configButtonBorderRadius } = sizes;

const WorkoutConfigVerticalButtonComponent = ({
  control,
  name,
  onPress,
  disabled,
}: WorkoutConfigButtonProps) => {
  const value = useWatch({
    control,
    name,
  });

  const { backgroundColorStatus, valueFormatter } =
    workoutSettingsButtonConfigMap[name];

  const formattedValue = valueFormatter(value);

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedbackConditionally(
        onPress,
        HapticFeedbackTypes.selection,
      )}
      disabled={disabled}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({
          disabled,
          pressed,
        });

        return (
          <AppView
            grow
            opacity={opacity}
            width={configButtonSize}
            borderRadius={configButtonBorderRadius}
            backgroundColorStatus={backgroundColorStatus}
            justifyContent={'center'}
            alignItems={'center'}>
            <AppRow>
              <AppText
                textAlign={'center'}
                category={'header'}
                numberOfLines={1}>
                {formattedValue}
              </AppText>
            </AppRow>
          </AppView>
        );
      }}
    </Pressable>
  );
};

export const WorkoutConfigVerticalButton = memo(
  WorkoutConfigVerticalButtonComponent,
);
