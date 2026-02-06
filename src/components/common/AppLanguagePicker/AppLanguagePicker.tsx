import {AppRow} from '../AppRow.tsx';
import {SupportedLanguageCode} from '../../../shared/types.ts';
import {AppLanguageButton} from './components/AppLanguageButton.tsx';
import i18next from 'i18next';

/**
 * Will be used when I will refactor translation mechanics to context...
 */
export const AppLanguagePicker = () => {
  const handleLanguageButtonPress = (languageCode: SupportedLanguageCode) =>
    i18next.changeLanguage(languageCode);

  const flags = Object.values(SupportedLanguageCode).map(languageCode => (
    <AppLanguageButton
      key={languageCode}
      languageCode={languageCode}
      onPress={handleLanguageButtonPress}
    />
  ));

  return <AppRow gap={'s'}>{flags}</AppRow>;
};
