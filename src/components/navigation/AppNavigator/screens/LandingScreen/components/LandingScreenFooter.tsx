import { memo } from 'react';
import { Trash } from 'lucide-react-native';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../types.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';

const _LandingScreenFooter = () => {
  const { text } = useAppThemedColors();

  const navigation = useRootStackNavigation();

  const onRunWorkout = () =>
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);

  return (
    <AppRoundedButtons
      isPlaying={false}
      onMainButtonPress={onRunWorkout}
      rightButton={
        <AppRoundedButton
          size={'s'}
          status={'negative'}>
          <Trash
            size={AppSize.ml}
            color={text}
          />
        </AppRoundedButton>
      }
    />
  );
};

export const LandingScreenFooter = memo(_LandingScreenFooter);
