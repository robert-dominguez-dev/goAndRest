import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
  soundVariantSettingAtom,
  voiceVariantSettingAtom,
  workoutLoadedSoundsAtom,
} from '../../contexts/atoms.ts';
import { useAppLanguage } from '../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { getCurrentWorkoutSoundFileNames } from './helpers/getCurrentWorkoutSoundFileNames.ts';
import { releaseWorkoutSounds } from './helpers/releaseWorkoutSounds.ts';
import { getLoadedCurrentWorkoutSounds } from './helpers/getLoadedCurrentWorkoutSounds.ts';
import { WorkoutSoundFeedback } from '../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import Sound from 'react-native-sound';

type AppAudioSessionMode = 'Default' | 'SpokenAudio';

const soundFeedbackToAudioMode: Record<
  WorkoutSoundFeedback,
  AppAudioSessionMode
> = {
  [WorkoutSoundFeedback.voice]: 'SpokenAudio',
  [WorkoutSoundFeedback.character]: 'SpokenAudio',
  [WorkoutSoundFeedback.sound]: 'Default',
  [WorkoutSoundFeedback.none]: 'Default',
};

export const useLoadWorkoutSounds = () => {
  const { language } = useAppLanguage();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const soundVariant = useAtomValue(soundVariantSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const setWorkoutLoadedSounds = useSetAtom(workoutLoadedSoundsAtom);

  useEffect(() => {
    Sound.setCategory('Ambient', true);
  }, []);

  useEffect(() => {
    Sound.setMode(soundFeedbackToAudioMode[soundFeedback]);
  }, [soundFeedback]);

  useEffect(() => {
    setWorkoutLoadedSounds(prevLoadedSounds => {
      releaseWorkoutSounds(prevLoadedSounds);

      const currentWorkoutSoundFileNames = getCurrentWorkoutSoundFileNames(
        soundFeedback,
        soundVariant,
        voiceVariant,
        characterVariant,
        language,
      );

      return getLoadedCurrentWorkoutSounds(currentWorkoutSoundFileNames);
    });
  }, [soundFeedback, voiceVariant, characterVariant, language]);
};
