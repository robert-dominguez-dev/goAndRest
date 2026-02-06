import { AppBottomSheet } from './AppBottomSheet.tsx';
import { useIsVisible } from './hooks/useIsVisible.ts';
import { AppBottomSheetWithOpenElementProps } from './types.ts';
import { AppLink } from '../AppLink.tsx';

export const AppBottomSheetWithOpenLink = ({
  enabledLabel,
  isPending,
  disabled,
  onClose,
  ...bottomSheetProps
}: Omit<AppBottomSheetWithOpenElementProps, 'disabledLabel'>) => {
  const { isVisible, handleOpen, handleClose } = useIsVisible();

  const handleCloseEvaluated = () => {
    handleClose();
    onClose?.();
  };

  return (
    <>
      <AppLink
        onPress={handleOpen}
        label={enabledLabel}
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
