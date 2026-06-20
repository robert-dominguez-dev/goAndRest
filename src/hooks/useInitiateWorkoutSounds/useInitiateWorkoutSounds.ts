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
import { useCheckIsPremiumCharacterActive } from '../../contexts/premiumCharacters/hooks/useCheckIsPremiumCharacterActive.ts';
import { WorkoutSoundFeedback } from '../../components/navigation/AppNavigator/screens/SettingsScreen/constants.tsx';
import { getCurrentWorkoutSoundFilePaths } from './helpers/getCurrentWorkoutSoundFilePaths.ts';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService, setupPlayer } from './helpers/setupPlayer.ts';
import { stopAndResetTrackPlayer } from './helpers/stopAndResetTrackPlayer.ts';

TrackPlayer.registerPlaybackService(() => PlaybackService);
void setupPlayer();

export const useInitiateWorkoutSounds = () => {
  const { language } = useAppLanguage();

  const soundFeedback = useAtomValue(soundFeedbackSettingAtom);
  const soundVariant = useAtomValue(soundVariantSettingAtom);
  const voiceVariant = useAtomValue(voiceVariantSettingAtom);
  const characterVariant = useAtomValue(characterVariantSettingAtom);

  const checkIsPremiumCharacterActive = useCheckIsPremiumCharacterActive();

  const setWorkoutSoundFilePaths = useSetAtom(workoutSoundFilePathsAtom);

  useEffect(() => {
    void stopAndResetTrackPlayer();

    /**
     * checkIsPremiumCharacterActive() switches soundFeedback back to
     * `voice` (persisted) when the premium character expired - reading
     * the result here too avoids a one-frame gap before that switch
     * is reflected in this same effect run.
     */
    const effectiveSoundFeedback: WorkoutSoundFeedback =
      soundFeedback === WorkoutSoundFeedback.character &&
      !checkIsPremiumCharacterActive()
        ? WorkoutSoundFeedback.voice
        : soundFeedback;

    const paths = getCurrentWorkoutSoundFilePaths(
      effectiveSoundFeedback,
      soundVariant,
      voiceVariant,
      characterVariant,
      language,
    );

    setWorkoutSoundFilePaths(paths);
  }, [
    soundFeedback,
    soundVariant,
    voiceVariant,
    characterVariant,
    language,
    checkIsPremiumCharacterActive,
  ]);
};
