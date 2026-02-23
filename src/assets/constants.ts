import { ImageURISource } from 'react-native';
import {
  WorkoutCharacterVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

export type AppIllustration =
  | `${WorkoutVoiceVariant}`
  | `${WorkoutCharacterVariant}`;

export const appIllustrations = {
  [WorkoutVoiceVariant.coachFemale]: require('./images/voices/coachFemale.png'),
  [WorkoutVoiceVariant.coachMale]: require('./images/voices/coachMale.png'),
  [WorkoutVoiceVariant.friendFemale]: require('./images/voices/friendFemale.png'),
  [WorkoutVoiceVariant.friendMale]: require('./images/voices/friendMale.png'),
  [WorkoutVoiceVariant.calmFemale]: require('./images/voices/calmFemale.png'),
  [WorkoutVoiceVariant.calmMale]: require('./images/voices/calmMale.png'),
  [WorkoutCharacterVariant.warrior]: require('./images/characters/warrior.png'),
  [WorkoutCharacterVariant.cyborg]: require('./images/characters/cyborg.png'),
  [WorkoutCharacterVariant.wizard]: require('./images/characters/wizard.png'),
} satisfies Record<AppIllustration, ImageURISource>;

export const appIllustrationToAspectRatio: Record<AppIllustration, number> = {
  [WorkoutVoiceVariant.coachFemale]: 216 / 357,
  [WorkoutVoiceVariant.coachMale]: 235 / 339,
  [WorkoutVoiceVariant.friendFemale]: 210 / 356,
  [WorkoutVoiceVariant.friendMale]: 241 / 344,
  [WorkoutVoiceVariant.calmFemale]: 214 / 343,
  [WorkoutVoiceVariant.calmMale]: 251 / 344,
  [WorkoutCharacterVariant.warrior]: 306 / 373,
  [WorkoutCharacterVariant.cyborg]: 282 / 315,
  [WorkoutCharacterVariant.wizard]: 303 / 376,
};

export enum AppAnimation {
  thinkingOwl = 'thinking_owl',
  loader = 'loader',
  confetti = 'confetti',
}
