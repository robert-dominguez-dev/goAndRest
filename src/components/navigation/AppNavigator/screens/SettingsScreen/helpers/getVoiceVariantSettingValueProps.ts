import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutVoiceVariant } from '../constants.tsx';
import { LucideIcon, Mars, Venus } from 'lucide-react-native';
import { SettingValueProps } from '../types.ts';

const voiceVariantToEmoji: Record<WorkoutVoiceVariant, LucideIcon> = {
  [WorkoutVoiceVariant.coachFemale]: Venus,
  [WorkoutVoiceVariant.coachMale]: Mars,
  [WorkoutVoiceVariant.friendFemale]: Venus,
  [WorkoutVoiceVariant.friendMale]: Mars,
  [WorkoutVoiceVariant.calmFemale]: Venus,
  [WorkoutVoiceVariant.calmMale]: Mars,
};

export const getVoiceVariantSettingValueProps = (
  voiceVariant: WorkoutVoiceVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.voiceVariant.items',
    voiceVariant,
  );

  const IconComponent = voiceVariantToEmoji[voiceVariant];

  return { labelTranslateKey, IconComponent };
};
