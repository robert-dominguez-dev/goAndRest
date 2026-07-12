import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
} from '../../../../../../contexts/atoms.ts';
import { useIsPremiumCharacterUnlocked } from '../../../../../../contexts/premiumCharacters/hooks/useIsPremiumCharacterUnlocked.ts';
import { usePremiumCharacterBottomSheet } from '../../../../../common/PremiumCharacterBottomSheet/hooks/usePremiumCharacterBottomSheet.tsx';
import { WorkoutSoundFeedback } from '../constants.tsx';

/**
 * Selecting "Premium hlasy" as the feedback type only sticks if the user
 * actually has (or just activated) a premium character - otherwise the
 * premium character bottom sheet is forced open, and closing it without
 * activating anything reverts the feedback setting to whatever it was
 * before.
 */
export const usePremiumSoundFeedbackGuard = (
  onUnlockAllPress?: () => void,
) => {
  const [soundFeedback, setSoundFeedback] = useAtom(soundFeedbackSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const previousSoundFeedbackRef = useRef(soundFeedback);
  const wasOpenRef = useRef(false);

  const { bottomSheet, openBottomSheet, isOpen } =
    usePremiumCharacterBottomSheet(onUnlockAllPress);

  const isPremiumCharacterUnlocked = useIsPremiumCharacterUnlocked();

  const isCharacterActive = isPremiumCharacterUnlocked(characterVariant);

  useEffect(() => {
    if (soundFeedback !== WorkoutSoundFeedback.character) {
      previousSoundFeedbackRef.current = soundFeedback;
      return;
    }

    if (!isCharacterActive) {
      openBottomSheet();
    }
    /**
     * Intentionally only re-evaluated when soundFeedback itself changes -
     * this should run once per transition into `character`, not on every
     * activations/characterVariant tick.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundFeedback]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen && !isCharacterActive) {
      void setSoundFeedback(previousSoundFeedbackRef.current);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, isCharacterActive, setSoundFeedback]);

  return { bottomSheet };
};
