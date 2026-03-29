import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { useIsTablet } from '../../../../../hooks/useIsTablet.ts';
import { RunningWorkoutScreenMobile } from './RunningWorkoutScreenMobile.tsx';
import { RunningWorkoutScreenTablet } from './RunningWorkoutScreenTablet.tsx';

type RunningWorkoutScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.RunningWorkoutScreen
>;

export const RunningWorkoutScreen = ({
  navigation,
}: RunningWorkoutScreenProps) => {
  const isTablet = useIsTablet();

  const RunningWorkoutScreenComponent = isTablet
    ? RunningWorkoutScreenTablet
    : RunningWorkoutScreenMobile;

  const handleFinish = () =>
    navigation.reset({
      routes: [
        {
          name: AppNavigatorScreen.FinishedWorkoutScreen,
        },
      ],
    });

  return <RunningWorkoutScreenComponent onFinish={handleFinish} />;
};
