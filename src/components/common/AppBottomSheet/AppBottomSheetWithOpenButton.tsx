import { AppButton } from '../../controls/AppButton/AppButton.tsx';
import { AppBottomSheet } from './AppBottomSheet.tsx';
import { useIsVisible } from './hooks/useIsVisible.ts';
import { AppBottomSheetWithOpenElementProps } from './types.ts';

export const AppBottomSheetWithOpenButton = ({
  enabledLabel,
  disabledLabel,
  isPending,
  disabled,
  status,
  onClose,
  ...bottomSheetProps
}: AppBottomSheetWithOpenElementProps) => {
  const { isVisible, handleOpen, handleClose } = useIsVisible();

  const handleCloseEvaluated = () => {
    handleClose();
    onClose?.();
  };

  return (
    <>
      <AppButton
        onPress={handleOpen}
        status={status}
        enabledLabel={enabledLabel}
        disabledLabel={disabledLabel}
        isPending={isPending}
        disabled={disabled}
      />
      <AppBottomSheet
        {...bottomSheetProps}
        isVisible={isVisible}
        onClose={handleCloseEvaluated}
      />
    </>
  );
};
