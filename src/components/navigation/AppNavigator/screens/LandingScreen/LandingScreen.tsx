import { AppScreenLayout } from '../../../../common/AppScreenLayout.tsx';
import { AppIllustration } from '../../../../../assets/constants.ts';
import { AppCardProps } from '../../../../common/AppCards/components/AppCard.tsx';
import { AppCards } from '../../../../common/AppCards/AppCards.tsx';
import { useState } from 'react';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { AppLanguagePicker } from '../../../../common/AppLanguagePicker/AppLanguagePicker.tsx';

export const LandingScreen = () => {
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

  const title = t('landingScreen.title');

  return (
    <AppScreenLayout headerTitle={title}>
      <AppCards
        shouldUseScrollView
        cards={options}
        numberOfCardsPerRow={4}
        gap={'s'}
        selectedCardValue={selectedWorkoutId}
        onCardPress={setSelectedWorkoutId}
      />
      <AppLanguagePicker />
    </AppScreenLayout>
  );
};
