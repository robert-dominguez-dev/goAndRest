import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import {
  characterVariantSettingAtom,
  premiumCharacterActivationsAtom,
  soundFeedbackSettingAtom,
} from '../../atoms.ts';
import { checkIsCharacterActive } from '../helpers/checkIsCharacterActive.ts';
import { WorkoutSoundFeedback } from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

/**
 * Returns a function that checks whether the currently selected premium
 * character is still active. As a side effect, if the sound feedback is
 * set to `character` and it has expired (or was never activated), the
 * feedback setting is switched back to `voice` and persisted - the user
 * keeps hearing their previously chosen voice instead of a hardcoded
 * fallback, and Settings reflects the real state.
 */
export const useCheckIsPremiumCharacterActive = () => {
  const characterVariant = useAtomValue(characterVariantSettingAtom);
  const activations = useAtomValue(premiumCharacterActivationsAtom);
  const [soundFeedback, setSoundFeedback] = useAtom(soundFeedbackSettingAtom);

  return useCallback((): boolean => {
    const isActive = checkIsCharacterActive(activations, characterVariant);

    if (!isActive && soundFeedback === WorkoutSoundFeedback.character) {
      void setSoundFeedback(WorkoutSoundFeedback.voice);
    }

    return isActive;
  }, [activations, characterVariant, soundFeedback, setSoundFeedback]);
};
