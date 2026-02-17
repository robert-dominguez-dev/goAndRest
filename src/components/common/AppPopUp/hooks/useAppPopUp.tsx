import { AppPopUp, AppPopUpProps } from '../AppPopUp.tsx';
import { JSX, useState } from 'react';

type UsePopUpProps = Omit<AppPopUpProps, 'onClose'>;

export const useAppPopUp = () => {
  const [popUp, setPopUp] = useState<JSX.Element | null>(null);

  const handleOpen = (params: UsePopUpProps) =>
    setPopUp(
      <AppPopUp
        {...params}
        onClose={() => setPopUp(null)}
      />,
    );

  return { popUp, handleOpen };
};
