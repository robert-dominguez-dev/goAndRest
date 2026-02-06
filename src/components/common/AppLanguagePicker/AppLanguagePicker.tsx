import { AppRow } from '../AppRow.tsx';

import { AppLanguageButton } from './components/AppLanguageButton.tsx';
import { SupportedLanguageCode } from '../../../contexts/AppLanguageProvider/types.ts';
import { useAppLanguage } from '../../../contexts/AppLanguageProvider/AppLanguageProvider.tsx';

/**
 * Will be used when I will refactor translation mechanics to context...
 */
export const AppLanguagePicker = () => {
  const { language, changeLanguage } = useAppLanguage();

  const flags = Object.values(SupportedLanguageCode).map(languageCode => {
    const isSelected = languageCode === language;
    return (
      <AppLanguageButton
        key={languageCode}
        languageCode={languageCode}
        isSelected={isSelected}
        onPress={changeLanguage}
      />
    );
  });

  return <AppRow gap={'s'}>{flags}</AppRow>;
};
