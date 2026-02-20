import { JSX } from 'react';
import { LanguageSettingItem } from './components/items/LanguageSettingItem.tsx';
import { ThemeSettingItem } from './components/items/ThemeSettingItem.tsx';
import { KeepTimerInBackgroundSettingItem } from './components/items/KeepTimerInBackgroundSettingItem.tsx';
import { VibrationsSettingItem } from './components/items/VibrationsSettingItem.tsx';
import { WarmupSettingItem } from './components/items/WarmupSettingItem.tsx';
import { CooldownSettingItem } from './components/items/CooldownSettingItem.tsx';
import { SoundsSettingItem } from './components/items/SoundsSettingItem.tsx';

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
  <LanguageSettingItem key={'language'} />,
  <ThemeSettingItem key={'theme'} />,
];

export const workoutSettingsItems: JSX.Element[] = [
  <KeepTimerInBackgroundSettingItem key={'timer_in_background'} />,
  <WarmupSettingItem key={'warmup'} />,
  <CooldownSettingItem key={'cooldown'} />,
];

export const feedbackSettingsItems: JSX.Element[] = [
  <SoundsSettingItem key={'sounds'} />,
  <VibrationsSettingItem key={'vibrations'} />,
];
