import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { DEFAULT_WORKOUT_NAME } from '../../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { checkIsDefaultWorkoutConfig } from '../../../../../../helpers/checkIsDefaultWorkoutConfig.ts';
import { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';

type GetRunningWorkoutNameParams = {
  workoutName: string | undefined;
  workoutConfig: AppWorkoutConfig | undefined;
} & { t: TranslateFN };

export const getRunningWorkoutName = ({
  workoutName,
  workoutConfig,
  t,
}: GetRunningWorkoutNameParams) => {
  if (workoutName) {
    return workoutName;
  }

  const isDefaultWorkoutConfig = checkIsDefaultWorkoutConfig(workoutConfig);

  /**
   * User started the default config...
   */
  if (isDefaultWorkoutConfig) {
    return DEFAULT_WORKOUT_NAME;
  }

  /**
   * E.g. user changed workout config, didn't save it and started this unnamed config...
   */
  return t('screens.runningWorkoutScreen.title');
};
