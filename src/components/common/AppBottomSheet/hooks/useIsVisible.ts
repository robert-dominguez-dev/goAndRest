import { useMemo, useState } from 'react';

export const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);
  const toggleVisibility = () => setIsVisible(prev => !prev);

  return useMemo(
    () => ({ isVisible, onOpen, onClose, toggleVisibility }),
    [isVisible],
  );
};
