import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
} from '../../atoms.ts';
import { useIsPremiumCharacterUnlocked } from './useIsPremiumCharacterUnlocked.ts';
import { WorkoutSoundFeedback } from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

/**
 * Returns a function that checks whether the currently selected premium
 * character is still active (premium users always pass). As a side effect,
 * if the sound feedback is set to `character` and it isn't active, the
 * feedback setting is switched back to `voice` and persisted - the user
 * keeps hearing their previously chosen voice instead of a hardcoded
 * fallback, and Settings reflects the real state.
 */
export const useCheckIsPremiumCharacterActive = () => {
  const characterVariant = useAtomValue(characterVariantSettingAtom);
  const [soundFeedback, setSoundFeedback] = useAtom(soundFeedbackSettingAtom);
  const isPremiumCharacterUnlocked = useIsPremiumCharacterUnlocked();

  return useCallback((): boolean => {
    const isActive = isPremiumCharacterUnlocked(characterVariant);

    if (!isActive && soundFeedback === WorkoutSoundFeedback.character) {
      void setSoundFeedback(WorkoutSoundFeedback.voice);
    }

    return isActive;
  }, [
    isPremiumCharacterUnlocked,
    characterVariant,
    soundFeedback,
    setSoundFeedback,
  ]);
};
