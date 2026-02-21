import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';
import { JSX } from 'react';
import { useIsVisible } from '../../AppBottomSheet/hooks/useIsVisible.ts';

type OpenPopUpParams = Omit<AppPopUpProps, 'onClose'>;

export const useAppPopUp = (params: OpenPopUpParams) => {
  const { isVisible, onOpen, onClose } = useIsVisible();

  const popUp: JSX.Element | null = isVisible ? (
    <AppPopUp
      {...params}
      onClose={onClose}
    />
  ) : null;

  return { popUp, onOpen, onClose };
};
