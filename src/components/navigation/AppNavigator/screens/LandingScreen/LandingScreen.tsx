import {
  AppScreenLayout,
  AppScreenLayoutProps,
} from '../../../../common/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Menu, RotateCcw } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { WorkoutConfigButtons } from './components/WorkoutConfigButtons/WorkoutConfigButtons.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { LandingScreenFooter } from './components/LandingScreenFooter/LandingScreenFooter.tsx';
import { ExistingWorkoutButtonsRow } from './components/ExistingWorkoutButtonsRow/ExistingWorkoutButtonsRow.tsx';
import { useAppWorkouts } from '../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { AppWorkout } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { defaultWorkoutConfig } from '../../../../../contexts/AppWorkoutsProvider/constants.ts';
import { useUpdateFormBySelectedWorkout } from './hooks/useUpdateFormBySelectedWorkout.ts';
import { WorkoutConfigTimeView } from './components/WorkoutConfigButtons/components/WorkoutConfigTimeView.tsx';

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

  useUpdateFormBySelectedWorkout({
    selectedStoredWorkout,
    getValues: formProps.getValues,
    reset: formProps.reset,
  });

  const { isDirty } = useFormState({
    control: formProps.control,
  });

  const HeaderAccessoryRightIconComponent: AppScreenLayoutProps['HeaderAccessoryRightIconComponent'] =
    isDirty ? RotateCcw : undefined;

  const onHeaderAccessoryRightPress = () => formProps.reset();

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
        HeaderAccessoryRightIconComponent={HeaderAccessoryRightIconComponent}
        onHeaderAccessoryRightPress={onHeaderAccessoryRightPress}
        footer={footerElement}>
        <AppView
          grow
          gap={'l'}>
          {!!storedWorkouts.length && (
            <ExistingWorkoutButtonsRow workouts={storedWorkouts} />
          )}
          <WorkoutConfigTimeView control={formProps.control} />
          <WorkoutConfigButtons />
        </AppView>
      </AppScreenLayout>
    </FormProvider>
  );
};
