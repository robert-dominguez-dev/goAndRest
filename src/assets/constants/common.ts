import {
  WorkoutCharacterVariant,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { characters } from '../base64/characters.ts';
import { voices } from '../base64/voices.ts';

import { SoundPathByLanguage, WorkoutSoundPathsByLanguage } from '../types.ts';
import {
  coachFemalePreviewPathByLanguage,
  coachFemaleSoundPathsByLanguage,
} from './audio/voices/coachFemale.ts';
import {
  cyborgPreviewPathByLanguage,
  cyborgSoundPathsByLanguage,
} from './audio/characters/cyborg.ts';
import { warriorPreviewPathByLanguage } from './audio/characters/warrior.ts';
import { wizardPreviewPathByLanguage } from './audio/characters/wizard.ts';

export type AppFeedbackEntity =
  | `${WorkoutVoiceVariant}`
  | `${WorkoutCharacterVariant}`;

export const appIllustrations = {
  ...characters,
  ...voices,
} satisfies Record<AppFeedbackEntity, string>;

export const appFeedbackEntityToImageAspectRatio: Record<
  AppFeedbackEntity,
  number
> = {
  [WorkoutVoiceVariant.coachFemale]: 216 / 357,
  [WorkoutVoiceVariant.coachMale]: 235 / 339,
  [WorkoutVoiceVariant.friendFemale]: 210 / 356,
  [WorkoutVoiceVariant.friendMale]: 241 / 344,
  [WorkoutVoiceVariant.calmFemale]: 214 / 343,
  [WorkoutVoiceVariant.calmMale]: 251 / 344,
  [WorkoutCharacterVariant.warrior]: 337 / 373,
  [WorkoutCharacterVariant.cyborg]: 282 / 315,
  [WorkoutCharacterVariant.wizard]: 303 / 376,
};

export enum AppAnimation {
  thinkingOwl = 'thinking_owl',
  loader = 'loader',
  confetti = 'confetti',
}

type AppFeedbackEntityWithSoundVariants =
  | AppFeedbackEntity
  | `${WorkoutSoundVariant}`;

export const appFeedbackEntityToSoundFileNamesByLanguage: Record<
  AppFeedbackEntityWithSoundVariants,
  WorkoutSoundPathsByLanguage | null
> = {
  [WorkoutVoiceVariant.coachFemale]: coachFemaleSoundPathsByLanguage,
  [WorkoutVoiceVariant.coachMale]: null,
  [WorkoutVoiceVariant.friendFemale]: null,
  [WorkoutVoiceVariant.friendMale]: null,
  [WorkoutVoiceVariant.calmFemale]: null,
  [WorkoutVoiceVariant.calmMale]: null,
  [WorkoutCharacterVariant.warrior]: null,
  [WorkoutCharacterVariant.cyborg]: cyborgSoundPathsByLanguage,
  [WorkoutCharacterVariant.wizard]: null,
  [WorkoutSoundVariant.beep]: null,
  [WorkoutSoundVariant.bell]: null,
  [WorkoutSoundVariant.drum]: null,
  [WorkoutSoundVariant.snap]: null,
  [WorkoutSoundVariant.whistle]: null,
};

export const appFeedbackEntityToPreviewFileNameByLanguage: Record<
  AppFeedbackEntityWithSoundVariants,
  SoundPathByLanguage | undefined
> = {
  [WorkoutVoiceVariant.coachFemale]: coachFemalePreviewPathByLanguage,
  [WorkoutVoiceVariant.coachMale]: undefined,
  [WorkoutVoiceVariant.friendFemale]: undefined,
  [WorkoutVoiceVariant.friendMale]: undefined,
  [WorkoutVoiceVariant.calmFemale]: undefined,
  [WorkoutVoiceVariant.calmMale]: undefined,
  [WorkoutCharacterVariant.warrior]: warriorPreviewPathByLanguage,
  [WorkoutCharacterVariant.cyborg]: cyborgPreviewPathByLanguage,
  [WorkoutCharacterVariant.wizard]: wizardPreviewPathByLanguage,
  [WorkoutSoundVariant.beep]: undefined,
  [WorkoutSoundVariant.bell]: undefined,
  [WorkoutSoundVariant.drum]: undefined,
  [WorkoutSoundVariant.snap]: undefined,
  [WorkoutSoundVariant.whistle]: undefined,
};
