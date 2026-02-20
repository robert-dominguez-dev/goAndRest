import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutVoiceVariant } from '../constants.tsx';
import { LucideIcon, Mars, Venus } from 'lucide-react-native';
import { SettingValueProps } from '../types.ts';
import { AppColorUnion } from '../../../../../../types/ui.ts';

const voiceVariantToEmoji: Record<WorkoutVoiceVariant, LucideIcon> = {
  [WorkoutVoiceVariant.coachFemale]: Venus,
  [WorkoutVoiceVariant.coachMale]: Mars,
  [WorkoutVoiceVariant.friendFemale]: Venus,
  [WorkoutVoiceVariant.friendMale]: Mars,
  [WorkoutVoiceVariant.calmFemale]: Venus,
  [WorkoutVoiceVariant.calmMale]: Mars,
};

const voiceVariantToColorStatus: Record<WorkoutVoiceVariant, AppColorUnion> = {
  [WorkoutVoiceVariant.coachFemale]: 'female',
  [WorkoutVoiceVariant.coachMale]: 'male',
  [WorkoutVoiceVariant.friendFemale]: 'female',
  [WorkoutVoiceVariant.friendMale]: 'male',
  [WorkoutVoiceVariant.calmFemale]: 'female',
  [WorkoutVoiceVariant.calmMale]: 'male',
};

export const getVoiceVariantSettingValueProps = (
  voiceVariant: WorkoutVoiceVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.voiceVariant.items',
    voiceVariant,
  );

  const IconComponent = voiceVariantToEmoji[voiceVariant];

  const iconColorStatus = voiceVariantToColorStatus[voiceVariant];

  return { labelTranslateKey, IconComponent, iconColorStatus };
};
