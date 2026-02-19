import { AppTheme } from '../../../../../../types/common.ts';
import { useAppTheme } from '../../../../../../contexts/AppThemeProvider.tsx';
import { AppToggle } from '../../../../../common/AppToggle.tsx';

export const AppThemeToggle = () => {
  const { theme, changeTheme } = useAppTheme();

  const isDarkMode = theme === AppTheme.dark;

  const toggleTheme = (shouldBeDarkMode: boolean) =>
    changeTheme(shouldBeDarkMode ? AppTheme.dark : AppTheme.light);

  return (
    <AppToggle
      value={isDarkMode}
      onValueChange={toggleTheme}
    />
  );
};
