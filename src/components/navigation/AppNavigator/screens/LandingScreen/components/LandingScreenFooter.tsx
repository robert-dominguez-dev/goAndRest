import { JSX, memo } from 'react';
import { Save, Trash } from 'lucide-react-native';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { AppRoundedButton } from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../types.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { useAppWorkouts } from '../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { v4 as uuidv4 } from 'uuid';

const _LandingScreenFooter = () => {
  const { text } = useAppThemedColors();

  const { selectedWorkout, addWorkout, removeWorkout } = useAppWorkouts();

  const navigation = useRootStackNavigation();

  const onStartWorkout = () =>
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);

  const handleAddWorkout = () =>
    addWorkout({
      id: uuidv4(),
      meta: {
        name: 'Robert',
        createdAt: new Date(),
      },
      config: {
        prep: 0,
        work: 60,
        rest: 15,
        rounds: 3,
        cooldown: 30,
      },
    });

  const leftButtonElement: JSX.Element | undefined = selectedWorkout ? (
    <AppRoundedButton
      onPress={() => removeWorkout(selectedWorkout.id)}
      size={'s'}
      status={'negative'}>
      <Trash
        size={AppSize.ml}
        color={text}
      />
    </AppRoundedButton>
  ) : undefined;

  const rightButtonElement = (
    <AppRoundedButton
      onPress={handleAddWorkout}
      disabled={!!selectedWorkout}
      size={'s'}
      status={'grayscale'}>
      <Save
        size={AppSize.ml}
        color={text}
      />
    </AppRoundedButton>
  );

  return (
    <AppRoundedButtons
      isRunning={false}
      onMainButtonPress={onStartWorkout}
      leftButton={leftButtonElement}
      rightButton={rightButtonElement}
    />
  );
};

export const LandingScreenFooter = memo(_LandingScreenFooter);
