import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
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
import { CountdownSettingItem } from './components/items/CountdownSettingItem.tsx';
import { PersonalizedAdsSettingItem } from './components/items/PersonalizedAdsSettingItem.tsx';
import { ProBanner } from './components/ProBanner.tsx';
import { useIsPremium } from '../../../../../contexts/premium/hooks/useIsPremium.ts';
import { useBackupSection } from './hooks/useBackupSection.tsx';

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

const otherSettingsItems: JSX.Element[] = [
  <PersonalizedAdsSettingItem key={'personalized_ads'} />,
];

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const t = useAppTranslation();

  const isPremium = useIsPremium();

  const goToPaywall = () =>
    navigation.navigate(AppNavigatorScreen.PaywallScreen);

  const { items: backupSettingsItems, sheets: backupSheets } = useBackupSection(
    { onPremiumRequired: goToPaywall },
  );

  const feedbackSettingsItems: JSX.Element[] = [
    <SoundFeedbackSettingItem
      key={'sounds'}
      onUnlockAllPress={goToPaywall}
    />,
    <CountdownSettingItem key={'countdown'} />,
    <VibrationsSettingItem key={'vibrations'} />,
  ];

  return (
    <>
      <AppScreenLayout
        scrollable
        headerTitle={t('screens.settingsScreen.title')}
        headerAccessoryLeftIconName={'X'}
        onHeaderAccessoryLeftPress={navigation.goBack}>
        <AppView
          gap={'xl'}
          paddingBottom={'3xl'}>
          {!isPremium && <ProBanner onPress={goToPaywall} />}
          <SettingsSection
            iconName={'Palette'}
            label={t('screens.settingsScreen.appearanceSection.label')}
            items={appearanceSettingsItems}
          />
          <SettingsSection
            iconName={'Volume2'}
            label={t('screens.settingsScreen.feedbackSection.label')}
            items={feedbackSettingsItems}
          />
          <SettingsSection
            iconName={'Timer'}
            label={t('screens.settingsScreen.workoutSection.label')}
            items={workoutSettingsItems}
          />
          <SettingsSection
            iconName={'Database'}
            label={t('screens.settingsScreen.backupSection.label')}
            items={backupSettingsItems}
          />
          {!isPremium && (
            <SettingsSection
              iconName={'Settings'}
              label={t('screens.settingsScreen.otherSection.label')}
              items={otherSettingsItems}
            />
          )}
        </AppView>
      </AppScreenLayout>
      {backupSheets}
    </>
  );
};
