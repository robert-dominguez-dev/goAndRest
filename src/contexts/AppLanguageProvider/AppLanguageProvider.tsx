import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguageCode } from './constants.ts';
import { ChildrenProp } from '../../types/common.ts';
import { getDeviceLanguageCode } from '../../locales/helpers/getDeviceLanguageCode.ts';
import { checkIsSupportedAppLanguage } from '../../locales/helpers/checkIsSupportedAppLanguage.ts';
import { appI18NextConfig } from '../../locales/constants.ts';
import { AsyncStorageKey } from '../constants.ts';

type AppLanguageContextProps = {
  language: SupportedLanguageCode;
  changeLanguage: (language: SupportedLanguageCode) => void;
};

const AppLanguageContext = createContext<AppLanguageContextProps | undefined>(
  undefined,
);

export const AppLanguageProvider = ({ children }: ChildrenProp) => {
  const initialLanguage = getDeviceLanguageCode();

  const [language, setLanguage] =
    useState<SupportedLanguageCode>(initialLanguage);

  const [isStoredLanguageLoading, setIsStoredLanguageLoading] =
    useState<boolean>(true);

  const changeLocalLanguage = async (
    languageToChange: SupportedLanguageCode,
  ) => {
    await appI18NextConfig.changeLanguage(languageToChange);
    setLanguage(languageToChange);
  };

  const changeLanguage = (languageToChange: SupportedLanguageCode) => {
    void AsyncStorage.setItem(AsyncStorageKey.APP_LANGUAGE, languageToChange);
    void changeLocalLanguage(languageToChange);
  };

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.APP_LANGUAGE).then(
      async storedLanguage => {
        const isSupportedLanguage = (!!storedLanguage &&
          checkIsSupportedAppLanguage(storedLanguage)) satisfies boolean;

        if (isSupportedLanguage) {
          await changeLocalLanguage(storedLanguage);
        }

        setIsStoredLanguageLoading(false);
      },
    );
  }, []);

  if (isStoredLanguageLoading) {
    return null;
  }

  return (
    <AppLanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}>
      {children}
    </AppLanguageContext.Provider>
  );
};

export const useAppLanguage = () => {
  const context = useContext(AppLanguageContext);
  if (!context) {
    throw new Error(
      `${useAppLanguage.name} must be used within a ${AppLanguageProvider.name}`,
    );
  }
  return context;
};
