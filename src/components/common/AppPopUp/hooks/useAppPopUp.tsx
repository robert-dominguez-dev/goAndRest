import { useIsVisible } from '../../AppBottomSheet/hooks/useIsVisible.ts';
import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';

type UsePopUpProps = Omit<AppPopUpProps, 'isVisible' | 'onClose'>;

export const useAppPopUp = ({
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  ...props
}: UsePopUpProps) => {
  const { isVisible, onOpen, onClose } = useIsVisible();

  const handlePrimaryButtonPress = () => {
    onPrimaryButtonPress();
    onClose();
  };

  const handleSecondaryButtonPress = props.secondaryButtonLabel
    ? () => {
        onSecondaryButtonPress?.();
        onClose();
      }
    : undefined;

  const popUpElement = isVisible ? (
    <AppPopUp
      {...props}
      onPrimaryButtonPress={handlePrimaryButtonPress}
      onSecondaryButtonPress={handleSecondaryButtonPress}
    />
  ) : undefined;

  return { popUpElement, handleOpen: onOpen };
};
