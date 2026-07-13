import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundFeedback } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { AppIconName } from '../../../../../common/AppIcon.tsx';
import { AppColorUnion } from '../../../../../../types/ui.ts';

const soundFeedbackToIconName: Record<WorkoutSoundFeedback, AppIconName> = {
  [WorkoutSoundFeedback.voice]: 'Speech',
  [WorkoutSoundFeedback.character]: 'Gem',
  [WorkoutSoundFeedback.sound]: 'Music4',
  [WorkoutSoundFeedback.none]: 'VolumeOff',
};

const soundFeedbackToColorStatus: Partial<
  Record<WorkoutSoundFeedback, AppColorUnion>
> = {
  [WorkoutSoundFeedback.character]: 'premium',
};

export const getSoundFeedbackSettingValueProps = (
  soundFeedback: WorkoutSoundFeedback,
  isPremium = false,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.soundFeedback.items',
    soundFeedback,
  );

  const isUnlockedCharacterOption =
    soundFeedback === WorkoutSoundFeedback.character && isPremium;

  const iconName = soundFeedbackToIconName[soundFeedback];
  const colorStatus = isUnlockedCharacterOption
    ? 'text'
    : soundFeedbackToColorStatus[soundFeedback];

  return {
    labelTranslateKey,
    iconName,
    iconColorStatus: colorStatus,
    labelColorStatus: colorStatus,
  };
};
