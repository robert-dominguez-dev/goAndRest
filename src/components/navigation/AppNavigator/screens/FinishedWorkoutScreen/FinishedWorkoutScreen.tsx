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
import { RatingRequestHint } from './components/RatingRequestHint.tsx';

export const MIN_NUMBER_OF_WORKOUTS_TO_REQUEST_REVIEW = 3;

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

  const { titleKey, buttonLabelKey } = useBySoundFeedbackSettings({
    defaultValue: defaultFinishWorkoutScreenTranslateKeys,
    ...voiceVariantToFinishWorkoutScreenTranslateKeys,
    ...characterVariantToFinishWorkoutScreenTranslateKeys,
  });

  const isPremium = useIsPremium();

  const {
    sec,
    rpe,
    selectRpe,
    isRpePopupOpen,
    openRpePopup,
    closeRpePopup,
    streak,
    weekVolumeStats,
    commit,
  } = useFinishedWorkoutSummary();

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
        <FinishedWorkoutSummary
          sec={sec}
          rpe={rpe}
          streak={streak}
          weekVolumeStats={weekVolumeStats}
          isPremium={isPremium}
          onHistoryPress={handleHistoryPress}
          onDifficultyPress={openRpePopup}
        />
      </AppScreenLayout>
      {isRpePopupOpen && (
        <RpeRatingPopUp
          onSelect={selectRpe}
          onClose={closeRpePopup}
          selectedRpe={rpe}
        />
      )}
    </>
  );
};
