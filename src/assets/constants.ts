import { ImageURISource } from 'react-native';
import {
  WorkoutCharacterVariant,
  WorkoutVoiceVariant,
} from '../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';

export type AppIllustration =
  | `${WorkoutVoiceVariant}`
  | `${WorkoutCharacterVariant}`;

export const appIllustrations: Record<AppIllustration, ImageURISource> = {
  [WorkoutVoiceVariant.coachFemale]: require('./images/voices/coachFemale.png'),
  [WorkoutVoiceVariant.coachMale]: require('./images/voices/coachMale.png'),
  [WorkoutVoiceVariant.friendFemale]: require('./images/voices/friendFemale.png'),
  [WorkoutVoiceVariant.friendMale]: require('./images/voices/friendMale.png'),
  [WorkoutVoiceVariant.calmFemale]: require('./images/voices/calmFemale.png'),
  [WorkoutVoiceVariant.calmMale]: require('./images/voices/calmMale.png'),
  [WorkoutCharacterVariant.warrior]: require('./images/characters/warrior.png'),
  [WorkoutCharacterVariant.cyborg]: require('./images/characters/cyborg.png'),
  [WorkoutCharacterVariant.wizard]: require('./images/characters/wizard.png'),
};

export enum AppAnimation {
  thinkingOwl = 'thinking_owl',
  loader = 'loader',
  confetti = 'confetti',
}
