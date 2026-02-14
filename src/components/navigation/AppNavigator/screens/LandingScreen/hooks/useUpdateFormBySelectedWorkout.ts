import { useEffect } from 'react';
import { isEqual } from 'lodash';
import { defaultWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/constants.ts';
import {
  AppStoredWorkout,
  AppWorkout,
} from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';

type UseUpdateFormBySelectedWorkoutParams = {
  selectedStoredWorkout: AppStoredWorkout | null;
  getValues: UseFormGetValues<AppWorkout>;
  reset: UseFormReset<AppWorkout>;
};

export const useUpdateFormBySelectedWorkout = ({
  selectedStoredWorkout,
  getValues,
  reset,
}: UseUpdateFormBySelectedWorkoutParams) => {
  useEffect(() => {
    const currentFormConfig = getValues();
    const selectedStoredConfig = selectedStoredWorkout?.config;

    if (!selectedStoredConfig) {
      const isFormInDefaultState = isEqual(
        currentFormConfig,
        defaultWorkoutConfig,
      );

      if (!isFormInDefaultState) {
        reset(defaultWorkoutConfig);
      }
      return undefined;
    }

    const isFormUpToDate = isEqual(currentFormConfig, selectedStoredConfig);

    if (!isFormUpToDate) {
      reset(selectedStoredConfig);
    }
  }, [selectedStoredWorkout]);
};
