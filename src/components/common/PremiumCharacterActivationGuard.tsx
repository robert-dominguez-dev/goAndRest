import { useEffect } from 'react';
import {
  useCheckIsPremiumCharacterActive
} from '../../contexts/premiumCharacters/hooks/useCheckIsPremiumCharacterActive.ts';

/**
 * Quick check so Settings never shows a `character` feedback as active
 * when its 7-day activation already expired while the app was closed.
 */
export const PremiumCharacterActivationGuard = () => {
  const checkIsPremiumCharacterActive = useCheckIsPremiumCharacterActive();

  useEffect(() => {
    checkIsPremiumCharacterActive();
  }, [checkIsPremiumCharacterActive]);

  return null;
};
