import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Palette, Volume2, X, Zap } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { SettingsSection } from './components/SettingsSection.tsx';
import {
  appearanceSettingsItems,
  feedbackSettingsItems,
  workoutSettingsItems,
} from './constants.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';

type SettingsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SettingsScreen
>;

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
          IconComponent={Zap}
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
