import {
  WorkoutCharacterVariant,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { characters } from '../base64/characters.ts';
import { voices } from '../base64/voices.ts';

import {
  AppWallpaper,
  SoundPathByLanguage,
  WorkoutSoundFilePaths,
  WorkoutSoundPathsByLanguage,
} from '../types.ts';
import {
  coachFemalePreviewPathByLanguage,
  coachFemaleSoundPathsByLanguage,
} from './audio/voices/coachFemale.ts';
import {
  cyborgPreviewPathByLanguage,
  cyborgSoundPathsByLanguage,
} from './audio/characters/cyborg.ts';
import {
  warriorPreviewPathByLanguage,
  warriorSoundPathsByLanguage,
} from './audio/characters/warrior.ts';
import {
  wizardPreviewPathByLanguage,
  wizardSoundPathsByLanguage,
} from './audio/characters/wizard.ts';
import { wallpapers } from '../base64/wallpapers.ts';
import {
  shieldmaidenPreviewPathByLanguage,
  shieldmaidenSoundPathsByLanguage,
} from './audio/characters/shieldmaiden.ts';
import {
  coachMalePreviewPathByLanguage,
  coachMaleSoundPathsByLanguage,
} from './audio/voices/coachMale.ts';
import { bellPreviewPath, bellSoundPaths } from './audio/sounds/bell.ts';
import { beepPreviewPath, beepSoundPaths } from './audio/sounds/beep.ts';
import {
  briefFemalePreviewPathByLanguage,
  briefFemaleSoundPathsByLanguage,
} from './audio/voices/briefFemale.ts';
import {
  briefMalePreviewPathByLanguage,
  briefMaleSoundPathsByLanguage,
} from './audio/voices/briefMale.ts';

export type AppFeedbackEntity =
  | `${WorkoutVoiceVariant}`
  | `${WorkoutCharacterVariant}`;

export const appIllustrations = {
  ...characters,
  ...voices,
  ...wallpapers,
} satisfies Record<AppFeedbackEntity | AppWallpaper, string>;

export type AppIllustrationName = keyof typeof appIllustrations;

export const appFeedbackEntityToImageAspectRatio: Record<
  AppIllustrationName,
  number
> = {
  [WorkoutVoiceVariant.coachFemale]: 216 / 357,
  [WorkoutVoiceVariant.coachMale]: 235 / 339,
  [WorkoutVoiceVariant.briefFemale]: 210 / 356,
  [WorkoutVoiceVariant.briefMale]: 241 / 344,
  [WorkoutVoiceVariant.calmFemale]: 214 / 343,
  [WorkoutVoiceVariant.calmMale]: 251 / 344,
  [WorkoutCharacterVariant.warrior]: 337 / 373,
  [WorkoutCharacterVariant.shieldmaiden]: 342 / 381,
  [WorkoutCharacterVariant.cyborg]: 282 / 315,
  [WorkoutCharacterVariant.wizard]: 303 / 376,
  wallpaperDumbbell: 1,
  wallpaperWarrior: 1,
  wallpaperCyborg: 1,
  wallpaperWizard: 1,
};

export enum AppAnimation {
  loader = 'loader',
  confetti = 'confetti',
}

export const appFeedbackEntityToSoundFileNamesByLanguage: Record<
  AppFeedbackEntity,
  WorkoutSoundPathsByLanguage | null
> = {
  [WorkoutVoiceVariant.coachFemale]: coachFemaleSoundPathsByLanguage,
  [WorkoutVoiceVariant.coachMale]: coachMaleSoundPathsByLanguage,
  [WorkoutVoiceVariant.briefFemale]: briefFemaleSoundPathsByLanguage,
  [WorkoutVoiceVariant.briefMale]: briefMaleSoundPathsByLanguage,
  [WorkoutVoiceVariant.calmFemale]: null,
  [WorkoutVoiceVariant.calmMale]: null,
  [WorkoutCharacterVariant.warrior]: warriorSoundPathsByLanguage,
  [WorkoutCharacterVariant.shieldmaiden]: shieldmaidenSoundPathsByLanguage,
  [WorkoutCharacterVariant.cyborg]: cyborgSoundPathsByLanguage,
  [WorkoutCharacterVariant.wizard]: wizardSoundPathsByLanguage,
};

export const soundVariantToFileNames: Record<
  WorkoutSoundVariant,
  WorkoutSoundFilePaths | null
> = {
  [WorkoutSoundVariant.beep]: beepSoundPaths,
  [WorkoutSoundVariant.bell]: bellSoundPaths,
  [WorkoutSoundVariant.drum]: null,
  [WorkoutSoundVariant.snap]: null,
  [WorkoutSoundVariant.whistle]: null,
};

export const appFeedbackEntityToPreviewFileNameByLanguage: Record<
  AppFeedbackEntity,
  SoundPathByLanguage | undefined
> = {
  [WorkoutVoiceVariant.coachFemale]: coachFemalePreviewPathByLanguage,
  [WorkoutVoiceVariant.coachMale]: coachMalePreviewPathByLanguage,
  [WorkoutVoiceVariant.briefFemale]: briefFemalePreviewPathByLanguage,
  [WorkoutVoiceVariant.briefMale]: briefMalePreviewPathByLanguage,
  [WorkoutVoiceVariant.calmFemale]: undefined,
  [WorkoutVoiceVariant.calmMale]: undefined,
  [WorkoutCharacterVariant.warrior]: warriorPreviewPathByLanguage,
  [WorkoutCharacterVariant.shieldmaiden]: shieldmaidenPreviewPathByLanguage,
  [WorkoutCharacterVariant.cyborg]: cyborgPreviewPathByLanguage,
  [WorkoutCharacterVariant.wizard]: wizardPreviewPathByLanguage,
};

export const soundVariantToPreviewFileNames: Record<
  WorkoutSoundVariant,
  string | undefined
> = {
  [WorkoutSoundVariant.beep]: beepPreviewPath,
  [WorkoutSoundVariant.bell]: bellPreviewPath,
  [WorkoutSoundVariant.drum]: undefined,
  [WorkoutSoundVariant.snap]: undefined,
  [WorkoutSoundVariant.whistle]: undefined,
};
