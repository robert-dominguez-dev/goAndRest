import { AppView } from '../../AppView.tsx';

import { appLanguageCodeToFlagEmoji } from '../constants.tsx';
import { ACTIVE_OPACITY, INACTIVE_OPACITY } from '../../../../constants/ui.ts';
import { Pressable } from 'react-native';

import { SupportedLanguageCode } from '../../../../contexts/AppLanguageProvider/types.ts';
import { AppText } from '../../AppText/AppText.tsx';

type AppLanguageButtonProps = {
  languageCode: SupportedLanguageCode;
  isSelected: boolean;
  onPress: (languageCode: SupportedLanguageCode) => void;
};

export const AppLanguageButton = ({
  languageCode,
  isSelected,
  onPress,
}: AppLanguageButtonProps) => {
  const flagEmoji = appLanguageCodeToFlagEmoji[languageCode];

  const opacity = isSelected ? ACTIVE_OPACITY : INACTIVE_OPACITY;

  const handlePress = () => onPress(languageCode);

  return (
    <Pressable onPress={handlePress}>
      <AppView opacity={opacity}>
        <AppText category={'title'}>{flagEmoji}</AppText>
      </AppView>
    </Pressable>
  );
};
