import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { AppView } from '../../../../common/AppView/AppView.tsx';
import { AppButton } from '../../../../controls/AppButton/AppButton.tsx';
import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { useBySoundFeedbackSettings } from '../../../hooks/useBySoundFeedbackSettings.ts';
import {
  characterVariantToFinishWorkoutScreenTranslateKeys,
  defaultFinishWorkoutScreenTranslateKeys,
  voiceVariantToFinishWorkoutScreenTranslateKeys,
} from './constants.ts';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../constants/common.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { useAtomValue } from 'jotai';
import { finishedWorkoutStatsAtom } from '../../../../../contexts/atoms.ts';
import { getNumber } from '../../../../../helpers/getNumber.ts';
import { FullScreenConfettiAnimation } from '../../../../common/FullScreenConfettiAnimation.tsx';
import { useFinishedWorkoutFeedbackOnMount } from '../../../../../hooks/useFinishedWorkoutFeedbackOnMount.ts';
import { useFinishWorkout } from '../../../hooks/useFinishWorkout.ts';

export const FinishedWorkoutScreen = () => {
  useFinishedWorkoutFeedbackOnMount();

  const t = useAppTranslation();

  const finishedWorkoutStats = useAtomValue(finishedWorkoutStatsAtom);

  const totalWorkoutDuration =
    Date.now() - getNumber(finishedWorkoutStats?.startedAt);

  const {
    titleKey,
    descriptionKey,
    buttonLabelKey,
    stats: { totalTimeKey },
  } = useBySoundFeedbackSettings({
    defaultValue: defaultFinishWorkoutScreenTranslateKeys,
    ...voiceVariantToFinishWorkoutScreenTranslateKeys,
    ...characterVariantToFinishWorkoutScreenTranslateKeys,
  });

  const finishWorkout = useFinishWorkout();

  return (
    <>
      <AppScreenLayout
        headerTitle={t(titleKey)}
        footer={
          <AppButton
            label={t(buttonLabelKey)}
            onPress={finishWorkout}
          />
        }>
        <AppView gap={'l'}>
          <AppText
            category={'content'}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t(descriptionKey)}
          </AppText>
          <AppView gap={'m'}>
            <AppText
              colorStatus={'textMuted'}
              category={'subHeader'}
              textAlign={'center'}
              numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
              {t(totalTimeKey)}
            </AppText>
            <AppTimeView
              colorStatus={'textMuted'}
              fontSizeOverride={80}
              msLeft={totalWorkoutDuration}
            />
          </AppView>
        </AppView>
      </AppScreenLayout>
      <FullScreenConfettiAnimation isPresent />
    </>
  );
};
