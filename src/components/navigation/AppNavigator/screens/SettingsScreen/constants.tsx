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
