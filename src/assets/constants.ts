import {
  WorkoutCharacterVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { characters } from './base64/characters.ts';
import { voices } from './base64/voices.ts';

export type AppIllustration =
  | `${WorkoutVoiceVariant}`
  | `${WorkoutCharacterVariant}`;

export const appIllustrations = {
  ...characters,
  ...voices,
} satisfies Record<AppIllustration, string>;

export const appIllustrationToAspectRatio: Record<AppIllustration, number> = {
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
