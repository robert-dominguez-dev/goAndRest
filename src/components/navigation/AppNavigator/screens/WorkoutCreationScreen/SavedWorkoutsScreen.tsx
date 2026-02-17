import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ArrowLeft } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';

type SavedWorkoutsScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.SavedWorkoutsScreen
>;

export const SavedWorkoutsScreen = ({
  navigation,
}: SavedWorkoutsScreenProps) => {
  const t = useAppTranslation();

  return (
    <AppScreenLayout
      headerTitle={t('screens.savedWorkoutsScreen.title')}
      HeaderAccessoryLeftIconComponent={ArrowLeft}
      onHeaderAccessoryLeftPress={navigation.goBack}>
      <AppText>JOJOJOJ</AppText>
    </AppScreenLayout>
  );
};
