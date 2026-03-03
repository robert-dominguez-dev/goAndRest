import { memo } from 'react';
import { useAppTranslation } from '../../../../../../../../locales/hooks/useAppTranslation.ts';
import { useStartWorkout } from '../../../../../../hooks/useStartWorkout.ts';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppDottedButton } from '../../../../../../../common/AppDottedButton.tsx';
import { History, Play } from 'lucide-react-native';
import { composeLastWorkoutButtonLabel } from '../helpers/composeLastWorkoutButtonLabel.ts';
import { getRunningWorkoutName } from '../../../../RunningWorkoutScreen/helpers/getRunningWorkoutName.ts';

type LastRunningWorkoutButtonProps = {
  lastRunningWorkout: AppWorkoutFieldValues;
};

const LastRunningWorkoutButtonComponent = ({
  lastRunningWorkout,
}: LastRunningWorkoutButtonProps) => {
  const t = useAppTranslation();

  const startWorkout = useStartWorkout();

  const handleStartWorkout = () => startWorkout(lastRunningWorkout);

  const { workoutName, ...workoutConfig } = lastRunningWorkout;

  const workoutNameEvaluated = getRunningWorkoutName({
    workoutName,
    workoutConfig,
    t,
  });

  const label = composeLastWorkoutButtonLabel(workoutNameEvaluated, t);

  return (
    <AppDottedButton
      label={label}
      onPress={handleStartWorkout}
      AccessoryLeftIconComponent={History}
      AccessoryRightIconComponent={Play}
    />
  );
};

export const LastRunningWorkoutButton = memo(LastRunningWorkoutButtonComponent);
