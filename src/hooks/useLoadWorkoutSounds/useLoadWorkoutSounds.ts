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

export const useLoadWorkoutSounds = () => {
  const { language } = useAppLanguage();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const soundVariant = useAtomValue(soundVariantSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const setWorkoutLoadedSounds = useSetAtom(workoutLoadedSoundsAtom);

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
