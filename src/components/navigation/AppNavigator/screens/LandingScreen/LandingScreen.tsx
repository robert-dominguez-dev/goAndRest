import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Menu } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { WorkoutConfigButtons } from './components/WorkoutConfigButtons.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { LandingScreenFooter } from './components/LandingScreenFooter.tsx';
import { WorkoutButtons } from './components/WorkoutButtons.tsx';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { AppWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { isEqual } from 'lodash';

const footerElement = <LandingScreenFooter />;

type LandingScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.LandingScreen
>;

export const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const t = useAppTranslation();

  const { storedWorkouts, selectedStoredWorkout } = useAppWorkouts();

  const formProps = useForm<AppWorkout>({
    defaultValues: defaultWorkoutConfig,
  });

  useEffect(() => {
    if (!selectedStoredWorkout?.config) {
      return undefined;
    }

    const currentFormConfig = formProps.getValues();

    const isFormUpToDate = isEqual(
      currentFormConfig,
      selectedStoredWorkout.config,
    );

    if (!isFormUpToDate) {
      formProps.reset(selectedStoredWorkout.config);
    }
  }, [selectedStoredWorkout]);

  const goToSettings = () =>
    navigation.navigate(AppNavigatorScreen.SettingsScreen);

  const headerTitle: string =
    selectedStoredWorkout?.meta.name || t('screens.landingScreen.title');

  return (
    <FormProvider {...formProps}>
      <AppScreenLayout
        headerTitle={headerTitle}
        HeaderAccessoryLeftIconComponent={Menu}
        onHeaderAccessoryLeftPress={goToSettings}
        footer={footerElement}>
        <AppView
          grow
          gap={'l'}>
          {!!storedWorkouts.length && (
            <WorkoutButtons workouts={storedWorkouts} />
          )}
          <AppView
            grow
            alignItems={'center'}
            justifyContent={'center'}>
            <AppTimeView seconds={90} />
          </AppView>
          <WorkoutConfigButtons />
        </AppView>
      </AppScreenLayout>
    </FormProvider>
  );
};
