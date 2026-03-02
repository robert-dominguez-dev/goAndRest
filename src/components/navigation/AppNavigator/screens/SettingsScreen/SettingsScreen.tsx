import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Palette, Timer, Volume2, X } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { SettingsSection } from './components/SettingsSection.tsx';

import { AppView } from '../../../../common/AppView/AppView.tsx';
import { JSX } from 'react';
import { LanguageSettingItem } from './components/items/LanguageSettingItem.tsx';
import { ThemeSettingItem } from './components/items/ThemeSettingItem.tsx';
import { KeepTimerInBackgroundSettingItem } from './components/items/KeepTimerInBackgroundSettingItem.tsx';
import { WarmupSettingItem } from './components/items/WarmupSettingItem.tsx';
import { CooldownSettingItem } from './components/items/CooldownSettingItem.tsx';
import { SoundFeedbackSettingItem } from './components/items/SoundFeedbackSettingItem.tsx';
import { VibrationsSettingItem } from './components/items/VibrationsSettingItem.tsx';

type SettingsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SettingsScreen
>;

const appearanceSettingsItems: JSX.Element[] = [
  <LanguageSettingItem key={'language'} />,
  <ThemeSettingItem key={'theme'} />,
];

const workoutSettingsItems: JSX.Element[] = [
  <KeepTimerInBackgroundSettingItem key={'timer_in_background'} />,
  <WarmupSettingItem key={'warmup'} />,
  <CooldownSettingItem key={'cooldown'} />,
];

const feedbackSettingsItems: JSX.Element[] = [
  <SoundFeedbackSettingItem key={'sounds'} />,
  <VibrationsSettingItem key={'vibrations'} />,
];

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const t = useAppTranslation();

  return (
    <AppScreenLayout
      scrollable
      headerTitle={t('screens.settingsScreen.title')}
      HeaderAccessoryLeftIconComponent={X}
      onHeaderAccessoryLeftPress={navigation.goBack}
      screenPaddingTopOverride={'ml'}>
      <AppView
        gap={'xl'}
        paddingBottom={'3xl'}>
        <SettingsSection
          IconComponent={Palette}
          label={t('screens.settingsScreen.appearanceSection.label')}
          items={appearanceSettingsItems}
        />
        <SettingsSection
          IconComponent={Timer}
          label={t('screens.settingsScreen.workoutSection.label')}
          items={workoutSettingsItems}
        />
        <SettingsSection
          IconComponent={Volume2}
          label={t('screens.settingsScreen.feedbackSection.label')}
          items={feedbackSettingsItems}
        />
      </AppView>
    </AppScreenLayout>
  );
};
