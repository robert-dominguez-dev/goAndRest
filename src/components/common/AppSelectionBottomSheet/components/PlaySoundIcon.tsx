import { GestureResponderEvent, Pressable } from 'react-native';
import { getOnPressWithHapticFeedback } from '../../../controls/helpers/getOnPressWithHapticFeedback.ts';

import { AppIcon, AppIconName } from '../../AppIcon.tsx';
import { playSound, PlaySoundParams } from '../../../../helpers/playSound.ts';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { playingPreviewAtom } from '../../../../contexts/atoms.ts';
import { stopAndResetTrackPlayer } from '../../../../hooks/useInitiateWorkoutSounds/helpers/stopAndResetTrackPlayer.ts';
import { useOnTrackFinished } from '../../../../hooks/useOnTrackFinished.ts';

export type PlaySoundIconProps = {
  audioParams: PlaySoundParams;
};

export const PlaySoundIcon = ({
  audioParams: { soundKey, url },
}: PlaySoundIconProps) => {
  const [playingPreviewKey, setPlayingPreviewKey] = useAtom(playingPreviewAtom);

  const play = async () => {
    await stopAndResetTrackPlayer();
    await playSound({ soundKey, url });
    setPlayingPreviewKey(soundKey);
  };

  const stop = async () => {
    await stopAndResetTrackPlayer();
    setPlayingPreviewKey(null);
  };

  const isPlaying = playingPreviewKey === soundKey;

  useOnTrackFinished(soundKey, () => {
    if (isPlaying) {
      setPlayingPreviewKey(null);
    }
  });

  useEffect(() => {
    return () => {
      void stop();
    };
  }, []);

  const handlePress = async (event: GestureResponderEvent) => {
    event.preventDefault();

    if (isPlaying) {
      await stop();
    } else {
      await play();
    }
  };

  const iconName: AppIconName = isPlaying ? 'StopCircle' : 'PlayCircle';

  return (
    <Pressable onPress={getOnPressWithHapticFeedback(handlePress)}>
      <AppIcon name={iconName} />
    </Pressable>
  );
};
