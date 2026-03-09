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
  briefMale = 'briefMale',
  briefFemale = 'briefFemale',
  calmMale = 'calmMale',
  calmFemale = 'calmFemale',
}

export const workoutVoiceVariants: WorkoutVoiceVariant[] = [
  WorkoutVoiceVariant.briefFemale,
  WorkoutVoiceVariant.briefMale,
  WorkoutVoiceVariant.coachFemale,
  WorkoutVoiceVariant.coachMale,
  // WorkoutVoiceVariant.calmFemale,
  // WorkoutVoiceVariant.calmMale,
];

export enum WorkoutCharacterVariant {
  warrior = 'warrior',
  shieldmaiden = 'shieldmaiden',
  cyborg = 'cyborg',
  wizard = 'wizard',
}

export const workoutCharacterVariants: WorkoutCharacterVariant[] = [
  WorkoutCharacterVariant.warrior,
  WorkoutCharacterVariant.shieldmaiden,
  WorkoutCharacterVariant.cyborg,
  WorkoutCharacterVariant.wizard,
];

export enum WorkoutSoundVariant {
  beep = 'beep',
  bell = 'bell',
  whistle = 'whistle',
  drum = 'drum',
  snap = 'snap',
}

export const workoutSoundVariants: WorkoutSoundVariant[] = [
  WorkoutSoundVariant.beep,
  WorkoutSoundVariant.bell,
  // WorkoutSoundVariant.drum,
  // WorkoutSoundVariant.snap,
  // WorkoutSoundVariant.whistle,
];

export enum WorkoutCountdownVariant {
  ten = '10',
  five = '5',
  three = '3',
  none = '0',
}

export const workoutCountdownVariants: WorkoutCountdownVariant[] = [
  WorkoutCountdownVariant.ten,
  WorkoutCountdownVariant.five,
  WorkoutCountdownVariant.three,
  WorkoutCountdownVariant.none,
];
