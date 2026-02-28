import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutVoiceVariant } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { getBottomSheetItemMiniImageProps } from './getBottomSheetItemMiniImageProps.ts';
import { appFeedbackEntityToPreviewFileNameByLanguage } from '../../../../../../assets/constants/common.ts';

export const getVoiceVariantSettingValueProps = (
  voiceVariant: WorkoutVoiceVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.voiceVariant.items',
    voiceVariant,
  );

  return {
    labelTranslateKey,
    imageProps: getBottomSheetItemMiniImageProps(voiceVariant),
    audioPathByLanguage:
      appFeedbackEntityToPreviewFileNameByLanguage[voiceVariant],
  };
};
