import { ComponentType, memo, useRef } from 'react';
import { useIsVisible } from '../../../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { WorkoutConfigBottomSheet } from './WorkoutConfigBottomSheet.tsx';

import { useFormContext } from 'react-hook-form';
import { AppWorkout } from '../../../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutConfigButtonProps } from '../../../types.ts';

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
  const { isVisible, onOpen, onClose } = useIsVisible();

  const { control, getValues, setValue } = useFormContext<AppWorkout>();

  const lastValueRef = useRef<number>(null);

  const handleClose = () => {
    lastValueRef.current = null;
    onClose();
  };

  const handleOpenBottomSheet = () => {
    lastValueRef.current = getValues(name);
    onOpen();
  };

  const handleCloseAndRevertChanges = () => {
    if (lastValueRef.current !== null) {
      setValue(name, lastValueRef.current);
    }
    handleClose();
  };

  return (
    <>
      <ButtonComponent
        name={name}
        control={control}
        disabled={disabled}
        onPress={handleOpenBottomSheet}
      />
      <WorkoutConfigBottomSheet
        name={name}
        control={control}
        isVisible={isVisible}
        onClose={handleCloseAndRevertChanges}
        onConfirm={handleClose}
      />
    </>
  );
};

export const WorkoutConfigButtonWithSheet = memo(
  WorkoutConfigButtonWithSheetComponent,
);
