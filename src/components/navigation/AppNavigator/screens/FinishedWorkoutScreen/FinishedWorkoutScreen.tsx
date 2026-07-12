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
import {
  ONE_SECOND_MS,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../constants/common.ts';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { useAtomValue } from 'jotai';
import {
  finishedWorkoutsCountAtom,
  starsRatedAtom,
} from '../../../../../contexts/atoms.ts';
import { useFinishedWorkoutFeedbackOnMount } from '../../../../../hooks/useFinishedWorkoutFeedbackOnMount.ts';
import { useFinishWorkout } from '../../../hooks/useFinishWorkout.ts';
import { AppOrientationLocker } from '../../../../common/AppOrientationLocker.tsx';
import { useRef } from 'react';
import { AppNavigatorScreen } from '../../types.ts';
import { useRootStackNavigation } from '../../../hooks/useRootStackNavigation.ts';
import { useIsPremium } from '../../../../../contexts/premium/hooks/useIsPremium.ts';
import { useFinishedWorkoutSummary } from './hooks/useFinishedWorkoutSummary.ts';
import { FinishedWorkoutSummary } from './components/FinishedWorkoutSummary.tsx';
import { RpeRatingPopUp } from './components/RpeRatingPopUp.tsx';
import { AppDivider } from '../../../../common/AppDivider.tsx';
import { RatingRequestHint } from './components/RatingRequestHint.tsx';

const MIN_NUMBER_OF_WORKOUTS_TO_REQUEST_REVIEW = 3;

export const FinishedWorkoutScreen = () => {
  useFinishedWorkoutFeedbackOnMount();

  const navigation = useRootStackNavigation();

  const t = useAppTranslation();

  const starsRated = useAtomValue(starsRatedAtom);
  const starsRatedOriginallyRef = useRef(starsRated);

  const finishedWorkoutsCount = useAtomValue(finishedWorkoutsCountAtom);

  const shouldRequestReview: boolean =
    finishedWorkoutsCount >= MIN_NUMBER_OF_WORKOUTS_TO_REQUEST_REVIEW &&
    !starsRatedOriginallyRef.current;

  const {
    titleKey,
    buttonLabelKey,
    stats: { totalTimeKey },
  } = useBySoundFeedbackSettings({
    defaultValue: defaultFinishWorkoutScreenTranslateKeys,
    ...voiceVariantToFinishWorkoutScreenTranslateKeys,
    ...characterVariantToFinishWorkoutScreenTranslateKeys,
  });

  const isPremium = useIsPremium();

  const { sec, rpe, setRpe, streak, weekVolumeStats, commit } =
    useFinishedWorkoutSummary();

  const finishWorkout = useFinishWorkout();

  const handleFinish = () => {
    commit();
    finishWorkout();
  };

  const handleHistoryPress = () => {
    commit();
    navigation.navigate(AppNavigatorScreen.HistoryScreen);
  };

  const footerElement = (
    <AppView gap={'m'}>
      {shouldRequestReview && <RatingRequestHint />}
      <AppButton
        label={t(buttonLabelKey)}
        onPress={handleFinish}
      />
    </AppView>
  );

  return (
    <>
      <AppOrientationLocker orientation={'PORTRAIT'} />
      <AppScreenLayout
        scrollable
        headerTitle={t(titleKey)}
        footer={footerElement}>
        <AppView gap={'m'}>
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
              msLeft={sec * ONE_SECOND_MS}
            />
          </AppView>
          <AppDivider />
          <FinishedWorkoutSummary
            rpe={rpe}
            streak={streak}
            weekVolumeStats={weekVolumeStats}
            isPremium={isPremium}
            onHistoryPress={handleHistoryPress}
          />
        </AppView>
      </AppScreenLayout>
      {rpe === null && <RpeRatingPopUp onSelect={setRpe} />}
    </>
  );
};
