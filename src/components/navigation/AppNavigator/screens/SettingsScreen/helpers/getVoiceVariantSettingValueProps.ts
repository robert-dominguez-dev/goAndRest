import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutVoiceVariant } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { getBottomSheetItemMiniImageProps } from './getBottomSheetItemMiniImageProps.ts';
import { appFeedbackEntityToPreviewFileNameByLanguage } from '../../../../../../assets/constants/common.ts';
import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/constants.ts';

export const getVoiceVariantSettingValueProps = (
  voiceVariant: WorkoutVoiceVariant,
  language: SupportedLanguageCode,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.voiceVariant.items',
    voiceVariant,
  );

  return {
    labelTranslateKey,
    imageProps: getBottomSheetItemMiniImageProps(voiceVariant),
    previewAudioUrl:
      appFeedbackEntityToPreviewFileNameByLanguage[voiceVariant]?.[language],
  };
};
