import { SoundPathByLanguage } from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

export const coachMalePreviewPathByLanguage: SoundPathByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/voices/coach/male/coach_male_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/voices/coach/male/coach_male_en_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/voices/coach/male/coach_male_sk_preview.m4a'),
};
