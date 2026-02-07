import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from './AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { ACTIVE_OPACITY, INACTIVE_OPACITY } from '../../constants/ui.ts';

type AppLanguageButtonProps = {
  emoji: string;
  isSelected: boolean;
  onPress: () => void;
};

const _AppEmojiButton = ({
  emoji,
  isSelected,
  onPress,
}: AppLanguageButtonProps) => {
  const opacity = isSelected ? ACTIVE_OPACITY : INACTIVE_OPACITY;
  return (
    <Pressable onPress={onPress}>
      <AppView opacity={opacity}>
        <AppText category={'header'}>{emoji}</AppText>
      </AppView>
    </Pressable>
  );
};

export const AppEmojiButton = memo(_AppEmojiButton);
