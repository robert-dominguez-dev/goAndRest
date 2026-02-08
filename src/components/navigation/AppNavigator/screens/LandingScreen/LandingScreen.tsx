import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { AppIllustration } from '../../../../../assets/constants.ts';
import { AppCardProps } from '../../../../common/AppCards/components/AppCard.tsx';
import { useState } from 'react';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { Menu } from 'lucide-react-native';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { WorkoutSettingsButtons } from './components/WorkoutSettingsButtons.tsx';
import { AppView } from '../../../../common/AppView.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';

type LandingScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.LandingScreen
>;

export const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const t = useAppTranslation();

  const [selectedWorkoutId, setSelectedWorkoutId] =
    useState<string>('NKN21212LM1L');

  const options: AppCardProps<string>[] = [
    {
      title: 'Burpees',
      value: 'NKN21212LM1L',
      illustrationName: AppIllustration.bible,
      backgroundColorStatus: 'backgroundAlt',
      selectedBackgroundColorStatus: 'primary',
    },
    {
      title: 'Burpees1',
      value: 'NKN21212LM11',
      illustrationName: AppIllustration.earth,
      backgroundColorStatus: 'backgroundAlt',
      selectedBackgroundColorStatus: 'primary',
    },
    {
      title: 'Burpees2',
      value: 'NKN21212LM12',
      illustrationName: AppIllustration.earth,
      backgroundColorStatus: 'backgroundAlt',
      selectedBackgroundColorStatus: 'primary',
    },
    {
      title: 'Burpees3',
      value: 'NKN21212LM13',
      illustrationName: AppIllustration.earth,
      backgroundColorStatus: 'backgroundAlt',
      selectedBackgroundColorStatus: 'primary',
    },
    {
      title: 'Burpees4',
      value: 'NKN21212LM14',
      illustrationName: AppIllustration.earth,
      backgroundColorStatus: 'backgroundAlt',
      selectedBackgroundColorStatus: 'primary',
    },
  ];

  const goToSettings = () =>
    navigation.navigate(AppNavigatorScreen.SettingsScreen);

  return (
    <AppScreenLayout
      headerTitle={t('screens.landingScreen.title')}
      HeaderAccessoryLeftIconComponent={Menu}
      onHeaderAccessoryLeftPress={goToSettings}
      footer={<AppView />}>
      <AppView
        grow
        alignItems={'center'}
        justifyContent={'center'}>
        <AppTimeView seconds={90} />
      </AppView>
      <WorkoutSettingsButtons />
    </AppScreenLayout>
  );
};
