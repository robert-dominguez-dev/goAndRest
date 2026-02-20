import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundVariant } from '../constants.tsx';
import {
  Bell,
  Drum,
  HandFist,
  LucideIcon,
  Radio,
  Shell,
} from 'lucide-react-native';
import { SettingValueProps } from '../types.ts';

const soundVariantToEmoji: Record<WorkoutSoundVariant, LucideIcon> = {
  [WorkoutSoundVariant.beep]: Radio,
  [WorkoutSoundVariant.bell]: Bell,
  [WorkoutSoundVariant.whistle]: Shell,
  [WorkoutSoundVariant.drum]: Drum,
  [WorkoutSoundVariant.snap]: HandFist,
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
