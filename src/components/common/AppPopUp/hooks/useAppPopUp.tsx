import { useIsVisible } from '../../AppBottomSheet/hooks/useIsVisible.ts';
import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';

type UsePopUpProps = Omit<AppPopUpProps, 'onClose'>;

export const useAppPopUp = (params: UsePopUpProps) => {
  const { isVisible, onOpen, onClose } = useIsVisible();

  const popUpElement = isVisible ? (
    <AppPopUp
      {...params}
      onClose={onClose}
    />
  ) : undefined;

  return { popUpElement, onOpen };
};
