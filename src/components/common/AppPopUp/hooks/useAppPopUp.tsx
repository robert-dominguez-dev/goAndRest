import { useIsVisible } from '../../AppBottomSheet/hooks/useIsVisible.ts';
import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';

type UsePopUpProps = Omit<AppPopUpProps, 'isVisible' | 'onClose'>;

export const useAppPopUp = ({
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  ...props
}: UsePopUpProps) => {
  const { isVisible, handleOpen, handleClose } = useIsVisible();

  const handlePrimaryButtonPress = () => {
    onPrimaryButtonPress();
    handleClose();
  };

  const handleSecondaryButtonPress = props.secondaryButtonLabel
    ? () => {
        onSecondaryButtonPress?.();
        handleClose();
      }
    : undefined;

  const popUpElement = isVisible ? (
    <AppPopUp
      {...props}
      onPrimaryButtonPress={handlePrimaryButtonPress}
      onSecondaryButtonPress={handleSecondaryButtonPress}
    />
  ) : undefined;

  return { popUpElement, handleOpen };
};
