import { useEffect } from 'react';
import { AppWorkoutConfigKey } from '../constants.ts';
import { useFormContext, useWatch } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';

export const useIsWithoutPauses = (
  roundsFieldName: Extract<AppWorkoutConfigKey, 'series' | 'rounds'>,
  pauseFieldName: Extract<AppWorkoutConfigKey, 'rest' | 'brake'>,
) => {
  const { control, getValues, setValue } = useFormContext<AppWorkout>();

  const roundsFieldValue = useWatch<AppWorkout>({
    control,
    name: roundsFieldName,
  });

  const isWithoutPauses = getNumber(roundsFieldValue) <= 1;

  useEffect(() => {
    if (isWithoutPauses) {
      const currentPauseValue = getValues(pauseFieldName);

      if (currentPauseValue !== 0) {
        setValue(pauseFieldName, 0);
      }
    }
  }, [isWithoutPauses]);

  return isWithoutPauses;
};
