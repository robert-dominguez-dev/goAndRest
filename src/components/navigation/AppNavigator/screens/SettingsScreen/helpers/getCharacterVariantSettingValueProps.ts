import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import {
  WorkoutCharacterVariant,
  WorkoutSoundFeedback,
} from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { getBottomSheetItemMiniImageProps } from './getBottomSheetItemMiniImageProps.ts';
import { appFeedbackEntityToPreviewFileNameByLanguage } from '../../../../../../assets/constants/common.ts';
import { SupportedLanguageCode } from '../../../../../../contexts/AppLanguageProvider/constants.ts';

export const getCharacterVariantSettingValueProps = (
  characterVariant: WorkoutCharacterVariant,
  language: SupportedLanguageCode,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.characterVariant.items',
    characterVariant,
  );

  return {
    labelTranslateKey,
    imageProps: getBottomSheetItemMiniImageProps(characterVariant),
    previewAudioUrl:
      appFeedbackEntityToPreviewFileNameByLanguage[characterVariant]?.[
        language
      ],
    analytics: {
      eventName: 'select_sound_feedback',
      eventParams: {
        soundFeedbackType: WorkoutSoundFeedback.character,
        soundFeedbackName: characterVariant,
      },
    },
  };
};
