import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ArrowLeft } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { SettingsItemList } from './components/SettingsItemList.tsx';

type SettingsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SettingsScreen
>;

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const t = useAppTranslation();

  return (
    <AppScreenLayout
      headerTitle={t('screens.settingsScreen.title')}
      HeaderAccessoryLeftIconComponent={ArrowLeft}
      onHeaderAccessoryLeftPress={navigation.goBack}
      screenPaddingTopOverride={'ml'}>
      <SettingsItemList />
    </AppScreenLayout>
  );
};
