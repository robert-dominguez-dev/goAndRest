import { TranslateKey } from '../../../../../locales/types.ts';
import { SettingsItemProps } from './components/SettingsItem.tsx';
import { AppLanguagePicker } from './components/AppLanguagePicker.tsx';
import { AppThemeToggle } from './components/AppThemeToggle.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppToggle } from '../../../../common/AppToggle.tsx';

export type SettingsItemConfig = Pick<SettingsItemProps, 'accessoryRight'> & {
  titleKey: TranslateKey;
  descriptionKey: TranslateKey;
};

export const appearanceSettingsItems: SettingsItemConfig[] = [
  {
    titleKey: 'screens.settingsScreen.appearanceSection.items.language.label',
    descriptionKey:
      'screens.settingsScreen.appearanceSection.items.language.description',
    accessoryRight: <AppLanguagePicker />,
  },
  {
    titleKey: 'screens.settingsScreen.appearanceSection.items.theme.label',
    descriptionKey:
      'screens.settingsScreen.appearanceSection.items.theme.description',
    accessoryRight: <AppThemeToggle />,
  },
];

export const workoutSettingsItems: SettingsItemConfig[] = [
  {
    titleKey:
      'screens.settingsScreen.workoutSection.items.keepTimerInBackground.label',
    descriptionKey:
      'screens.settingsScreen.workoutSection.items.keepTimerInBackground.description',
    accessoryRight: (
      <AppToggle
        value={true}
        onValueChange={value => console.log(value)}
      />
    ),
  },
  {
    titleKey: 'screens.settingsScreen.workoutSection.items.warmup.label',
    descriptionKey:
      'screens.settingsScreen.workoutSection.items.warmup.description',
    accessoryRight: (
      <AppText
        grow={false}
        textAlign={'right'}
        category={'subHeader'}>
        0:10
      </AppText>
    ),
  },
  {
    titleKey: 'screens.settingsScreen.workoutSection.items.cooldown.label',
    descriptionKey:
      'screens.settingsScreen.workoutSection.items.cooldown.description',
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
    titleKey: 'screens.settingsScreen.feedbackSection.items.sounds.label',
    descriptionKey:
      'screens.settingsScreen.feedbackSection.items.sounds.description',
    accessoryRight: (
      <AppToggle
        value={false}
        onValueChange={value => console.log(value)}
      />
    ),
  },
  {
    titleKey: 'screens.settingsScreen.feedbackSection.items.vibrations.label',
    descriptionKey:
      'screens.settingsScreen.feedbackSection.items.vibrations.description',
    accessoryRight: (
      <AppToggle
        value={true}
        onValueChange={value => console.log(value)}
      />
    ),
  },
];
