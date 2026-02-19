import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import { useAppTheme } from '../../../../../../../contexts/AppThemeProvider.tsx';
import { AppTheme } from '../../../../../../../types/common.ts';
import { AppToggleBase } from '../../../../../../common/AppToggle/component/AppToggleBase.tsx';

const ThemeSettingsItemComponent = () => {
  const t = useAppTranslation();

  const { theme, changeTheme } = useAppTheme();

  const isDarkMode = theme === AppTheme.dark;

  const toggleTheme = () =>
    changeTheme(isDarkMode ? AppTheme.light : AppTheme.dark);

  const accessoryRight = <AppToggleBase value={isDarkMode} />;

  return (
    <SettingsItem
      title={t('screens.settingsScreen.appearanceSection.items.theme.label')}
      description={t(
        'screens.settingsScreen.appearanceSection.items.theme.description',
      )}
      onPress={toggleTheme}
      accessoryRight={accessoryRight}
    />
  );
};

export const ThemeSettingsItem = memo(ThemeSettingsItemComponent);
