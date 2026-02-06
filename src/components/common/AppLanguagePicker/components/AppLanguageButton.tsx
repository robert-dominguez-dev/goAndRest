import { AppView } from '../../AppView.tsx';
import { SupportedLanguageCode } from '../../../../shared/types.ts';
import { appLanguageCodeToIcon } from '../constants.tsx';
import { ACTIVE_OPACITY, INACTIVE_OPACITY } from '../../../../constants/ui.ts';
import { Pressable } from 'react-native';
import { useSelectedAppLanguageCode } from '../hooks/useSelectedAppLanguageCode.tsx';

type AppLanguageButtonProps = {
  languageCode: SupportedLanguageCode;
  onPress: (languageCode: SupportedLanguageCode) => void;
};

export const AppLanguageButton = ({
  languageCode,
  onPress,
}: AppLanguageButtonProps) => {
  const selectedLanguageCode = useSelectedAppLanguageCode();

  const icon = appLanguageCodeToIcon[languageCode];

  const isSelected = languageCode === selectedLanguageCode;

  const opacity = isSelected ? ACTIVE_OPACITY : INACTIVE_OPACITY;

  const handlePress = () => onPress(languageCode);

  return (
    <Pressable onPress={handlePress}>
      <AppView opacity={opacity}>{icon}</AppView>
    </Pressable>
  );
};
