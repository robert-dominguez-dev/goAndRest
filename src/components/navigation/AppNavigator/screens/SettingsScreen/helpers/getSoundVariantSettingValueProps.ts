import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutSoundVariant } from '../constants.tsx';
import { AppIconName } from '../../../../../common/AppIcon.tsx';
import { SettingValueProps } from '../types.ts';
import { soundVariantToPreviewFileNames } from '../../../../../../assets/constants/common.ts';

const soundVariantToIconName: Record<WorkoutSoundVariant, AppIconName> = {
  [WorkoutSoundVariant.beep]: 'Radio',
  [WorkoutSoundVariant.bell]: 'Bell',
  [WorkoutSoundVariant.whistle]: 'Shell',
  [WorkoutSoundVariant.drum]: 'Drum',
  [WorkoutSoundVariant.snap]: 'HandFist',
};

export const getSoundVariantSettingValueProps = (
  soundVariant: WorkoutSoundVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.soundVariant.items',
    soundVariant,
  );

  const iconName = soundVariantToIconName[soundVariant];

  return {
    labelTranslateKey,
    iconName,
    previewAudioUrl: soundVariantToPreviewFileNames[soundVariant],
  };
};
