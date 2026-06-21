import { WorkoutCharacterVariant } from '../../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { PremiumCharacterActivations } from '../types.ts';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const PREMIUM_CHARACTER_ACTIVATION_DURATION_MS = 7 * ONE_DAY_MS;

export const EXTEND_POPUP_MAX_DAYS_REMAINING = 3;

export const checkIsCharacterActive = (
  activations: PremiumCharacterActivations,
  characterVariant: WorkoutCharacterVariant,
  now: number = Date.now(),
): boolean => {
  const activatedAt = activations[characterVariant];

  if (!activatedAt) return false;

  return now - activatedAt < PREMIUM_CHARACTER_ACTIVATION_DURATION_MS;
};

export const getCharacterActivationDaysRemaining = (
  activations: PremiumCharacterActivations,
  characterVariant: WorkoutCharacterVariant,
  now: number = Date.now(),
): number | null => {
  const activatedAt = activations[characterVariant];

  if (!activatedAt) {
    return null;
  }

  const expiresAt = activatedAt + PREMIUM_CHARACTER_ACTIVATION_DURATION_MS;

  if (expiresAt <= now) {
    return null;
  }

  return Math.round((expiresAt - now) / ONE_DAY_MS);
};
