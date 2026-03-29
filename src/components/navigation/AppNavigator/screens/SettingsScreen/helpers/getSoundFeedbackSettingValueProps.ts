import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundFeedback } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { AppIconName } from '../../../../../common/AppIcon.tsx';

const soundFeedbackToIconName: Record<WorkoutSoundFeedback, AppIconName> = {
  [WorkoutSoundFeedback.voice]: 'Speech',
  [WorkoutSoundFeedback.character]: 'Drama',
  [WorkoutSoundFeedback.sound]: 'Music4',
  [WorkoutSoundFeedback.none]: 'VolumeOff',
};

export const getSoundFeedbackSettingValueProps = (
  soundFeedback: WorkoutSoundFeedback,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.soundFeedback.items',
    soundFeedback,
  );

  const iconName = soundFeedbackToIconName[soundFeedback];

  return {
    labelTranslateKey,
    iconName,
  };
};
