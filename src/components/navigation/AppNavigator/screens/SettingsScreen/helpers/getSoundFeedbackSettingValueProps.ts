import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundFeedback } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import {
  Drama,
  LucideIcon,
  Music4,
  Speech,
  VolumeOff,
} from 'lucide-react-native';

const soundFeedbackToEmoji: Record<WorkoutSoundFeedback, LucideIcon> = {
  [WorkoutSoundFeedback.voice]: Speech,
  [WorkoutSoundFeedback.character]: Drama,
  [WorkoutSoundFeedback.sound]: Music4,
  [WorkoutSoundFeedback.none]: VolumeOff,
};

export const getSoundFeedbackSettingValueProps = (
  soundFeedback: WorkoutSoundFeedback,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.soundFeedback.items',
    soundFeedback,
  );

  const IconComponent = soundFeedbackToEmoji[soundFeedback];

  return {
    labelTranslateKey,
    IconComponent,
  };
};
