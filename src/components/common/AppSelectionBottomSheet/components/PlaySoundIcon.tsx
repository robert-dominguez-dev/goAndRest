import { GestureResponderEvent, Pressable } from 'react-native';
import { getOnPressWithHapticFeedback } from '../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import { HapticFeedbackTypes } from 'react-native-haptic-feedback';

import { LucideIcon, PlayCircle, StopCircle } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';
import { categoryToIconSize } from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { playSound, PlaySoundParams } from '../../../../hooks/playSound.ts';
import TrackPlayer from 'react-native-track-player';
import { useEffect, useState } from 'react';

export type PlaySoundIconProps = {
  audioParams: PlaySoundParams;
};

export const PlaySoundIcon = ({ audioParams }: PlaySoundIconProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { text } = useAppThemedColors();

  const play = () => {
    void playSound(audioParams);
    setIsPlaying(true);
  };

  const stop = () => {
    void TrackPlayer.stop();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  const handlePress = async (event: GestureResponderEvent) => {
    event.preventDefault();

    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  const IconComponent: LucideIcon = isPlaying ? StopCircle : PlayCircle;

  return (
    <Pressable
      onPress={getOnPressWithHapticFeedback(
        handlePress,
        HapticFeedbackTypes.selection,
      )}>
      <IconComponent
        color={text}
        size={categoryToIconSize.subHeader}
      />
    </Pressable>
  );
};
