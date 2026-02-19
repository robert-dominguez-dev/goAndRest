import { TranslateKey } from '../../../../../locales/types.ts';
import { JSX } from 'react';
import { LanguageSettingsItem } from './components/items/LanguageSettingsItem.tsx';
import { ThemeSettingsItem } from './components/items/ThemeSettingsItem.tsx';
import { SupportedLanguageCode } from '../../../../../contexts/AppLanguageProvider/types.ts';
import { KeepTimerInBackgroundSettingsItem } from './components/items/KeepTimerInBackgroundSettingsItem.tsx';
import { VibrationsSettingsItem } from './components/items/VibrationsSettingsItem.tsx';
import { WarmupSettingsItem } from './components/items/WarmupSettingsItem.tsx';
import { CooldownSettingsItem } from './components/items/CooldownSettingsItem.tsx';
import { SoundsSettingsItem } from './components/items/SoundsSettingsItem.tsx';

export const appLanguages: SupportedLanguageCode[] = [
  SupportedLanguageCode.cs,
  SupportedLanguageCode.en,
  SupportedLanguageCode.sk,
];

export const appLanguageCodeToFlagEmoji: Record<SupportedLanguageCode, string> =
  {
    [SupportedLanguageCode.cs]: '🇨🇿',
    [SupportedLanguageCode.sk]: '🇸🇰',
    [SupportedLanguageCode.en]: '🇬🇧',
  };

export const appLanguageCodeToLabelTranslateKey: Record<
  SupportedLanguageCode,
  TranslateKey
> = {
  [SupportedLanguageCode.cs]:
    'screens.settingsScreen.appearanceSection.items.language.items.cs',
  [SupportedLanguageCode.sk]:
    'screens.settingsScreen.appearanceSection.items.language.items.sk',
  [SupportedLanguageCode.en]:
    'screens.settingsScreen.appearanceSection.items.language.items.en',
};

export const appearanceSettingsItems: JSX.Element[] = [
  <LanguageSettingsItem key={'language'} />,
  <ThemeSettingsItem key={'theme'} />,
];

export const workoutSettingsItems: JSX.Element[] = [
  <KeepTimerInBackgroundSettingsItem key={'timer_in_background'} />,
  <WarmupSettingsItem key={'warmup'} />,
  <CooldownSettingsItem key={'cooldown'} />,
];

export const feedbackSettingsItems: JSX.Element[] = [
  <SoundsSettingsItem key={'sounds'} />,
  <VibrationsSettingsItem key={'vibrations'} />,
];
