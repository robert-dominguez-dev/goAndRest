import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { premiumCharacterActivationsAtom } from '../../atoms.ts';
import { checkIsCharacterActive } from '../helpers/checkIsCharacterActive.ts';
import { useIsPremium } from '../../premium/hooks/useIsPremium.ts';
import { WorkoutCharacterVariant } from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

/**
 * Single shared predicate for whether a premium character can be used right
 * now. Premium users have every character unlocked permanently; non-premium
 * users only have characters still within their 7-day rewarded-ad
 * activation window.
 */
export const useIsPremiumCharacterUnlocked = () => {
  const isPremium = useIsPremium();
  const activations = useAtomValue(premiumCharacterActivationsAtom);

  return useCallback(
    (characterVariant: WorkoutCharacterVariant): boolean =>
      isPremium || checkIsCharacterActive(activations, characterVariant),
    [isPremium, activations],
  );
};
