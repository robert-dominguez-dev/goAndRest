import { useEffect } from 'react';
import { AppWorkoutConfigKey } from '../constants.ts';
import { useFormContext, useWatch } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { getNumber } from '../../../../../../helpers/getNumber.ts';

export const useIsWithoutPauses = (
  roundsFieldName: Extract<AppWorkoutConfigKey, 'series' | 'rounds'>,
  pauseFieldName: Extract<AppWorkoutConfigKey, 'rest' | 'recovery'>,
) => {
  const { control, getValues, setValue } =
    useFormContext<AppWorkoutFieldValues>();

  const roundsFieldValue = useWatch<AppWorkoutFieldValues>({
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
