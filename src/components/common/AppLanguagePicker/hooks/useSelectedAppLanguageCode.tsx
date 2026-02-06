import { SupportedLanguageCode } from '../../../../shared/types.ts';
import i18next from 'i18next';
import { useEffect, useState } from 'react';

export const useSelectedAppLanguageCode = () => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    i18next.language,
  );

  useEffect(() => {
    const handleLanguageChange = (lng: SupportedLanguageCode) =>
      setSelectedLanguageCode(lng);

    i18next.on('languageChanged', handleLanguageChange);

    return () => i18next.off('languageChanged', handleLanguageChange);
  }, []);

  return selectedLanguageCode;
};
