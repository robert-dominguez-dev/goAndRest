import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { LandingScreenFooter } from './components/LandingScreenFooter/LandingScreenFooter.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { AppWorkoutFieldValues } from '../../../../../contexts/AppWorkoutsProvider/types.ts';
import { useAtomValue } from 'jotai';
import { lastDefaultWorkoutConfigAtom } from '../../../../../contexts/atoms.ts';
import { useIsTabletAndLandscape } from '../../../../../hooks/useIsTabletAndLandscape.ts';
import { LandingScreenContent } from './components/LandingScreenContent.tsx';
import { ComponentType, JSX } from 'react';
import { WorkoutConfigTimeViewProps } from './components/WorkoutConfigButtons/components/WorkoutConfigTimeView.tsx';
import { LandingScreenTabletLandscapeContent } from './components/LandingScreenTabletLandscapeContent.tsx';

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

  const isTabletLandscape = useIsTabletAndLandscape();

  const ContentComponent: ComponentType<WorkoutConfigTimeViewProps> =
    isTabletLandscape
      ? LandingScreenTabletLandscapeContent
      : LandingScreenContent;

  const footerElementEvaluated: JSX.Element | undefined = isTabletLandscape
    ? undefined
    : footerElement;

  return (
    <FormProvider {...formProps}>
      <AppScreenLayout
        headerTitle={t('screens.landingScreen.title')}
        headerAccessoryLeftIconName={'Menu'}
        onHeaderAccessoryLeftPress={goToSettings}
        footer={footerElementEvaluated}>
        <ContentComponent control={formProps.control} />
      </AppScreenLayout>
    </FormProvider>
  );
};
