import { memo } from 'react';
import { useRootStackNavigation } from '../../../../hooks/useRootStackNavigation.ts';
import { AppNavigatorScreen } from '../../../types.ts';
import { AppRoundedButtons } from '../../../../../common/AppRoundedButtons/AppRoundedButtons.tsx';
import { RunningWorkoutSkipButton } from './RunningWorkoutSkipButton.tsx';

const SKIP_SECONDS = 15;

const RunningWorkoutScreenFooterComponent = () => {
  const navigation = useRootStackNavigation();

  const onStartWorkout = () => {
    navigation.navigate(AppNavigatorScreen.RunningWorkoutScreen);
  };

  const prevButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => console.log('PREV')}
      direction={'left'}
      value={SKIP_SECONDS}
    />
  );

  const nextButtonElement = (
    <RunningWorkoutSkipButton
      onPress={() => console.log('NEXT')}
      direction={'right'}
      value={SKIP_SECONDS}
    />
  );

  return (
    <AppRoundedButtons
      isRunning={true}
      onMainButtonPress={onStartWorkout}
      leftButton={prevButtonElement}
      rightButton={nextButtonElement}
    />
  );
};

export const RunningWorkoutScreenFooter = memo(
  RunningWorkoutScreenFooterComponent,
);
