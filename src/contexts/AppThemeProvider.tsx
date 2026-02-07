import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppTheme, ChildrenProp } from '../types/common.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { checkIsAppTheme } from '../helpers/checkIsAppTheme.ts';

const APP_THEME_STORAGE_KEY = 'APP_THEME';

type AppThemeContextProps = {
  theme: AppTheme;
  changeTheme: (theme: AppTheme) => void;
};

const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined,
);

export const AppThemeProvider = ({ children }: ChildrenProp) => {
  const systemTheme: AppTheme =
    Appearance.getColorScheme() === 'light' ? AppTheme.light : AppTheme.dark;

  const [theme, setTheme] = useState<AppTheme>(systemTheme);

  useEffect(() => {
    AsyncStorage.getItem(APP_THEME_STORAGE_KEY).then(storedTheme => {
      const isAppTheme = checkIsAppTheme(storedTheme);
      console.log({ storedTheme });
      if (isAppTheme) {
        setTheme(storedTheme);
      }
    });
  }, []);

  const changeTheme = (themeToChange: AppTheme) => {
    void AsyncStorage.setItem(APP_THEME_STORAGE_KEY, themeToChange);
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
