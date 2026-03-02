import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppTheme, ChildrenProp } from '../types/common.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkIsAppTheme } from '../helpers/checkIsAppTheme.ts';
import { AsyncStorageKey } from './constants.ts';

type AppThemeContextProps = {
  theme: AppTheme;
  changeTheme: (theme: AppTheme) => void;
};

const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined,
);

export const AppThemeProvider = ({ children }: ChildrenProp) => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.dark);

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.APP_THEME).then(storedTheme => {
      const isAppTheme = checkIsAppTheme(storedTheme);
      if (isAppTheme) {
        setTheme(storedTheme);
      }
    });
  }, []);

  const changeTheme = (themeToChange: AppTheme) => {
    void AsyncStorage.setItem(AsyncStorageKey.APP_THEME, themeToChange);
    setTheme(themeToChange);
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      `${useAppTheme.name} must be used within a ${AppThemeProvider.name}`,
    );
  }
  return context;
};
