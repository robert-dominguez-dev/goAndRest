import { JSX } from 'react';
import { LanguageSettingsItem } from './components/items/LanguageSettingsItem.tsx';
import { ThemeSettingsItem } from './components/items/ThemeSettingsItem.tsx';
import { KeepTimerInBackgroundSettingsItem } from './components/items/KeepTimerInBackgroundSettingsItem.tsx';
import { VibrationsSettingsItem } from './components/items/VibrationsSettingsItem.tsx';
import { WarmupSettingsItem } from './components/items/WarmupSettingsItem.tsx';
import { CooldownSettingsItem } from './components/items/CooldownSettingsItem.tsx';
import { SoundsSettingsItem } from './components/items/SoundsSettingsItem.tsx';

export enum WorkoutSoundFeedback {
  voice = 'voice',
  character = 'character',
  sound = 'sound',
  none = 'none',
}

export const workoutSoundFeedbacks: WorkoutSoundFeedback[] = [
  WorkoutSoundFeedback.voice,
  WorkoutSoundFeedback.character,
  WorkoutSoundFeedback.sound,
  WorkoutSoundFeedback.none,
];

export enum WorkoutVoiceVariant {
  coachMale = 'coachMale',
  coachFemale = 'coachFemale',
  friendMale = 'friendMale',
  friendFemale = 'friendFemale',
  calmMale = 'calmMale',
  calmFemale = 'calmFemale',
}

export const workoutVoiceVariants: WorkoutVoiceVariant[] = [
  WorkoutVoiceVariant.coachFemale,
  WorkoutVoiceVariant.coachMale,
  WorkoutVoiceVariant.friendFemale,
  WorkoutVoiceVariant.friendMale,
  WorkoutVoiceVariant.calmFemale,
  WorkoutVoiceVariant.calmMale,
];

export enum WorkoutCharacterVariant {
  warrior = 'warrior',
  cyborg = 'cyborg',
  wizard = 'wizard',
}

export const workoutCharacterVariants: WorkoutCharacterVariant[] = [
  WorkoutCharacterVariant.warrior,
  WorkoutCharacterVariant.cyborg,
  WorkoutCharacterVariant.wizard,
];

export enum WorkoutSoundVariant {
  beep = 'beep',
  bell = 'bell',
  whistle = 'whistle',
  chime = 'chime',
}

export const workoutSoundVariants: WorkoutSoundVariant[] = [
  WorkoutSoundVariant.beep,
  WorkoutSoundVariant.bell,
  WorkoutSoundVariant.whistle,
  WorkoutSoundVariant.chime,
];

export const appearanceSettingsItems: JSX.Element[] = [
  <LanguageSettingsItem key={'language'} />,
  <ThemeSettingsItem key={'theme'} />,
];

export const workoutSettingsItems: JSX.Element[] = [
  <KeepTimerInBackgroundSettingsItem key={'timer_in_background'} />,
  <WarmupSettingsItem key={'warmup'} />,
  <CooldownSettingsItem key={'cooldown'} />,
];

export const feedbackSettingsItems: JSX.Element[] = [
  <SoundsSettingsItem key={'sounds'} />,
  <VibrationsSettingsItem key={'vibrations'} />,
];
