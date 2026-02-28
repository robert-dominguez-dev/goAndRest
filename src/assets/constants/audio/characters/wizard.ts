import { SoundPathByLanguage } from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

export const wizardPreviewPathByLanguage: SoundPathByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/characters/wizard/wizard_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/characters/wizard/wizard_cs_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/characters/wizard/wizard_cs_preview.m4a'),
};
