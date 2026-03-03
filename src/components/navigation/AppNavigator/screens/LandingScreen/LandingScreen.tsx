import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Menu } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { WorkoutConfigButtons } from './components/WorkoutConfigButtons/WorkoutConfigButtons.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { LandingScreenFooter } from './components/LandingScreenFooter/LandingScreenFooter.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { WorkoutConfigTimeView } from './components/WorkoutConfigButtons/components/WorkoutConfigTimeView.tsx';
import { useAtomValue } from 'jotai';
import { lastDefaultWorkoutConfigAtom } from '../../../../../contexts/atoms.ts';

const footerElement = <LandingScreenFooter />;

type LandingScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.LandingScreen
>;

export const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const t = useAppTranslation();

  const lastDefaultWorkoutConfig = useAtomValue(lastDefaultWorkoutConfigAtom);

  const formProps = useForm<AppWorkoutFieldValues>({
    defaultValues: lastDefaultWorkoutConfig,
    reValidateMode: 'onBlur',
  });

  const goToSettings = () =>
    navigation.navigate(AppNavigatorScreen.SettingsScreen);

  return (
    <FormProvider {...formProps}>
      <AppScreenLayout
        headerTitle={t('screens.landingScreen.title')}
        HeaderAccessoryLeftIconComponent={Menu}
        onHeaderAccessoryLeftPress={goToSettings}
        footer={footerElement}>
        <AppView
          grow
          gap={'m'}>
          <WorkoutConfigTimeView control={formProps.control} />
          <WorkoutConfigButtons />
        </AppView>
      </AppScreenLayout>
    </FormProvider>
  );
};
