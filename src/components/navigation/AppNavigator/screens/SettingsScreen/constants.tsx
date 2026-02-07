import { TranslateKey } from '../../../../../locales/types.ts';
import { SettingsItemProps } from './components/SettingsItem.tsx';
import { AppLanguagePicker } from './components/AppLanguagePicker.tsx';
import { AppThemeToggle } from './components/AppThemeToggle.tsx';

type SettingsItemConfig = Pick<SettingsItemProps, 'accessoryRight'> & {
  titleKey: TranslateKey;
};

export const settingsItems: SettingsItemConfig[] = [
  {
    titleKey: 'screens.settingsScreen.items.languagePicker.title',
    accessoryRight: <AppLanguagePicker />,
  },
  {
    titleKey: 'screens.settingsScreen.items.themePicker.title',
    accessoryRight: <AppThemeToggle />,
  },
];
