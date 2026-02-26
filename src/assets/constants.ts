import {
  WorkoutCharacterVariant,
  WorkoutSoundVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { characters } from './base64/characters.ts';
import { voices } from './base64/voices.ts';
import { cyborgSoundFileNamesByLanguage } from './audio/characters/cyborg/constants.ts';
import { WorkoutSoundPathsByLanguage } from './types.ts';
import { coachFemaleSoundFileNamesByLanguage } from './audio/characters/coach/female/constants.ts';

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
  [WorkoutVoiceVariant.coachFemale]: coachFemaleSoundFileNamesByLanguage,
  [WorkoutVoiceVariant.coachMale]: null,
  [WorkoutVoiceVariant.friendFemale]: null,
  [WorkoutVoiceVariant.friendMale]: null,
  [WorkoutVoiceVariant.calmFemale]: null,
  [WorkoutVoiceVariant.calmMale]: null,
  [WorkoutCharacterVariant.warrior]: null,
  [WorkoutCharacterVariant.cyborg]: cyborgSoundFileNamesByLanguage,
  [WorkoutCharacterVariant.wizard]: null,
  [WorkoutSoundVariant.beep]: null,
  [WorkoutSoundVariant.bell]: null,
  [WorkoutSoundVariant.drum]: null,
  [WorkoutSoundVariant.snap]: null,
  [WorkoutSoundVariant.whistle]: null,
};
