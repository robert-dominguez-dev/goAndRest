import {
  AppWorkoutConfigKey,
  WorkoutSettingsButtonConfig,
} from '../constants.ts';
import { memo } from 'react';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { Control, useWatch } from 'react-hook-form';
import { AppText } from '../../../../../common/AppText/AppText.tsx';

export type WorkoutConfigBottomSheetFormattedValueProps = Pick<
  WorkoutSettingsButtonConfig,
  'valueFormatter'
> & {
  name: AppWorkoutConfigKey;
  control: Control<AppWorkout>;
};

const _WorkoutConfigBottomSheetFormattedValue = ({
  name,
  control,
  valueFormatter,
}: WorkoutConfigBottomSheetFormattedValueProps) => {
  const value = useWatch({
    control,
    name,
  });

  const valueFormatted = valueFormatter(value);

  return (
    <AppText
      category={'header'}
      textAlign={'center'}
      fontSizeOverride={'xxl'}>
      {valueFormatted}
    </AppText>
  );
};

export const WorkoutConfigBottomSheetFormattedValue = memo(
  _WorkoutConfigBottomSheetFormattedValue,
);
