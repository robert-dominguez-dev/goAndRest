import { useMemo, useState } from 'react';

export const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const toggleVisibility = () => setIsVisible(prev => !prev);

  return useMemo(
    () => ({ isVisible, handleOpen, handleClose, toggleVisibility }),
    [isVisible],
  );
};
