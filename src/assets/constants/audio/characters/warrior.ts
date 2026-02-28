import { WorkoutSoundPathsByLanguage } from '../../../types.ts';
import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/constants.ts';

export const warriorPreviewFileNameByLanguage: WorkoutSoundPathsByLanguage = {
  [SupportedLanguageCode.cs]: require('../../../audio/preview/characters/warrior/warrior_cs_preview.m4a'),
  [SupportedLanguageCode.en]: require('../../../audio/preview/characters/warrior/warrior_cs_preview.m4a'),
  [SupportedLanguageCode.sk]: require('../../../audio/preview/characters/warrior/warrior_cs_preview.m4a'),
};
