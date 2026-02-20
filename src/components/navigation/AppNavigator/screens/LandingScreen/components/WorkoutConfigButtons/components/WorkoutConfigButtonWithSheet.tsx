import { ComponentType, memo } from 'react';

import { useFormContext } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutConfigButtonProps } from '../../../types.ts';
import { useWorkoutConfigBottomSheet } from '../hooks/useWorkoutConfigBottomSheet.tsx';

export type WorkoutConfigButtonWithSheetProps = Pick<
  WorkoutConfigButtonProps,
  'name' | 'disabled'
> & {
  ButtonComponent: ComponentType<WorkoutConfigButtonProps>;
};

const WorkoutConfigButtonWithSheetComponent = ({
  name,
  disabled,
  ButtonComponent,
}: WorkoutConfigButtonWithSheetProps) => {
  const { control } = useFormContext<AppWorkoutFieldValues>();

  const { bottomSheet, openWorkoutConfigBottomSheet } =
    useWorkoutConfigBottomSheet(name);

  return (
    <>
      <ButtonComponent
        name={name}
        control={control}
        disabled={disabled}
        onPress={openWorkoutConfigBottomSheet}
      />
      {bottomSheet}
    </>
  );
};

export const WorkoutConfigButtonWithSheet = memo(
  WorkoutConfigButtonWithSheetComponent,
);
