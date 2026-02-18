import { TranslateKey } from '../../../../../locales/types.ts';
import { SettingsItemProps } from './components/SettingsItem.tsx';
import { AppLanguagePicker } from './components/AppLanguagePicker.tsx';
import { AppThemeToggle } from './components/AppThemeToggle.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';

export type SettingsItemConfig = Pick<SettingsItemProps, 'accessoryRight'> & {
  titleKey: TranslateKey;
};

export const appearanceSettingsItems: SettingsItemConfig[] = [
  {
    titleKey: 'screens.settingsScreen.items.languagePicker.title',
    accessoryRight: <AppLanguagePicker />,
  },
  {
    titleKey: 'screens.settingsScreen.items.themePicker.title',
    accessoryRight: <AppThemeToggle />,
  },
];

export const workoutSettingsItems: SettingsItemConfig[] = [
  {
    titleKey: 'screens.settingsScreen.items.languagePicker.title',
    accessoryRight: (
      <AppText
        grow={false}
        textAlign={'right'}
        category={'subHeader'}>
        0:10
      </AppText>
    ),
  },
];

export const feedbackSettingsItems: SettingsItemConfig[] = [
  {
    titleKey: 'screens.settingsScreen.items.languagePicker.title',
    accessoryRight: <AppThemeToggle />,
  },
];
