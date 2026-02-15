import { memo, useRef } from 'react';
import { useIsVisible } from '../../../../../common/AppBottomSheet/hooks/useIsVisible.ts';
import { WorkoutConfigBottomSheet } from './WorkoutConfigBottomSheet.tsx';
import {
  WorkoutConfigButtonBase,
  WorkoutConfigButtonBaseProps,
} from './WorkoutConfigButtonBase.tsx';
import { useFormContext } from 'react-hook-form';
import { AppWorkout } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';

export type WorkoutConfigButtonWithSheetProps = Pick<
  WorkoutConfigButtonBaseProps,
  'name'
>;

const _WorkoutConfigButtonWithSheet = ({
  name,
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
      <WorkoutConfigButtonBase
        name={name}
        control={control}
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

export const WorkoutConfigButtonWithSheet = memo(_WorkoutConfigButtonWithSheet);
