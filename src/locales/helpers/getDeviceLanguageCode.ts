import { getLocales } from 'react-native-localize';
import { checkIsSupportedAppLanguage } from './checkIsSupportedAppLanguage.ts';
import { SupportedLanguageCode } from '../../contexts/AppLanguageProvider/types.ts';

export const getDeviceLanguageCode = (): SupportedLanguageCode => {
  const locales = getLocales();
  const deviceLanguageCode = locales[0]?.languageCode;

  return checkIsSupportedAppLanguage(deviceLanguageCode)
    ? deviceLanguageCode
    : SupportedLanguageCode.cs;
};
