import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  characterVariantSettingAtom,
  soundFeedbackSettingAtom,
  soundVariantSettingAtom,
  voiceVariantSettingAtom,
  workoutSoundFilePathsAtom,
} from '../../contexts/atoms.ts';
import { useAppLanguage } from '../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';
import { getCurrentWorkoutSoundFilePaths } from './helpers/getCurrentWorkoutSoundFilePaths.ts';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService, setupPlayer } from './helpers/setupPlayer.ts';
import { clearAndResetTrackPlayer } from './helpers/clearAndResetTrackPlayer.ts';

TrackPlayer.registerPlaybackService(() => PlaybackService);
void setupPlayer();

export const useInitiateWorkoutSounds = () => {
  const { language } = useAppLanguage();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const soundVariant = useAtomValue(soundVariantSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const setWorkoutSoundFilePaths = useSetAtom(workoutSoundFilePathsAtom);

  useEffect(() => {
    void clearAndResetTrackPlayer();

    const paths = getCurrentWorkoutSoundFilePaths(
      soundFeedback,
      soundVariant,
      voiceVariant,
      characterVariant,
      language,
    );

    setWorkoutSoundFilePaths(paths);
  }, [soundFeedback, soundVariant, voiceVariant, characterVariant, language]);
};
