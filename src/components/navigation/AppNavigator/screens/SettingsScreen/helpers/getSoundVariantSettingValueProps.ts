import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundVariant } from '../constants.tsx';
import {
  BellRing,
  LucideIcon,
  Radio,
  Shell,
  Sparkles,
} from 'lucide-react-native';
import { SettingValueProps } from '../types.ts';

const soundVariantToEmoji: Record<WorkoutSoundVariant, LucideIcon> = {
  [WorkoutSoundVariant.beep]: Radio,
  [WorkoutSoundVariant.bell]: BellRing,
  [WorkoutSoundVariant.whistle]: Shell,
  [WorkoutSoundVariant.chime]: Sparkles,
};

export const getSoundVariantSettingValueProps = (
  soundVariant: WorkoutSoundVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.soundVariant.items',
    soundVariant,
  );

  const IconComponent = soundVariantToEmoji[soundVariant];

  return { labelTranslateKey, IconComponent };
};
