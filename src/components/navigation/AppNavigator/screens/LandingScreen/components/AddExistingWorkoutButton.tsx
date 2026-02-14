import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { getAppRoundedButtonUIProps } from '../../../../../controls/AppRoundedButton/helpers/getAppRoundedButtonUIProps.ts';
import { Plus } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { GRADIENT_BORDER_WIDTH } from '../../../../../common/AppViewWithGradientBorder.tsx';
import {
  EXISTING_WORKOUT_BUTTON_ICON_SIZE,
  EXISTING_WORKOUT_BUTTON_SIZE,
} from '../constants.ts';
import { useFormContext } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';

export const AddExistingWorkoutButton = () => {
  const { text } = useAppThemedColors();

  const { setSelectedStoredWorkout } = useAppWorkouts();

  const { reset } = useFormContext<AppWorkout>();

  const handlePress = () => {
    setSelectedStoredWorkout(null);
    reset(defaultWorkoutConfig);
  };

  return (
    <Pressable onPress={getOnPressWithHapticFeedback(handlePress)}>
      {({ pressed }) => {
        const { width, height, borderRadius, opacity } =
          getAppRoundedButtonUIProps({
            pressed,
            disabled: false,
            status: 'grayscale',
            size: EXISTING_WORKOUT_BUTTON_SIZE,
            borderRadiusLevel: 'small',
          });

        const widthEvaluated = width + GRADIENT_BORDER_WIDTH;
        const heightEvaluated = height + GRADIENT_BORDER_WIDTH;

        return (
          <AppView
            width={widthEvaluated}
            height={heightEvaluated}
            borderRadius={borderRadius}
            opacity={opacity}
            backgroundColorStatus={'transparent'}
            borderStyle={'dotted'}
            borderColorStatus={'text'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Plus
              color={text}
              size={EXISTING_WORKOUT_BUTTON_ICON_SIZE}
            />
          </AppView>
        );
      }}
    </Pressable>
  );
};
