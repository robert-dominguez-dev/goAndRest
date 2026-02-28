import { getSplitTranslateKey } from '../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { WorkoutCharacterVariant } from '../constants.tsx';
import { SettingValueProps } from '../types.ts';
import { getBottomSheetItemMiniImageProps } from './getBottomSheetItemMiniImageProps.ts';
import { appFeedbackEntityToPreviewFileNameByLanguage } from '../../../../../../assets/constants/common.ts';

export const getCharacterVariantSettingValueProps = (
  characterVariant: WorkoutCharacterVariant,
): SettingValueProps => {
  const labelTranslateKey = getSplitTranslateKey(
    'screens.settingsScreen.feedbackSection.items.characterVariant.items',
    characterVariant,
  );

  return {
    labelTranslateKey,
    imageProps: getBottomSheetItemMiniImageProps(characterVariant),
    audioPathByLanguage:
      appFeedbackEntityToPreviewFileNameByLanguage[characterVariant],
  };
};
