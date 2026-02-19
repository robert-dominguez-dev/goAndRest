import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';
import { JSX, useState } from 'react';

type OpenPopUpParams = Omit<AppPopUpProps, 'onClose'>;

export const useAppPopUp = () => {
  const [popUp, setPopUp] = useState<JSX.Element | null>(null);

  const handleOpen = (params: OpenPopUpParams) =>
    setPopUp(
      <AppPopUp
        {...params}
        onClose={() => setPopUp(null)}
      />,
    );

  return { popUp, handleOpen };
};
