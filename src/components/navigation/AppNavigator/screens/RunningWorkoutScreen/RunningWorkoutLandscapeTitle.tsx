import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import {
  workoutPhaseToIconName,
  workoutPhaseToNameTranslateKey,
  workoutPhaseToTimerColorStatus,
} from './constants.tsx';
import {
  WorkoutConfigBottomSheetIconAndTitle
} from '../LandingScreen/components/WorkoutConfigButtons/components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { RunningWorkoutContentParams } from './types.ts';
import { AppRow } from '../../../../common/AppRow.tsx';
import { AppText } from '../../../../common/AppText/AppText.tsx';
import { AppTimeView } from '../../../../common/AppTimeView.tsx';
import { EMPTY_SPACE } from '../../../../../constants/common.ts';

type RunningWorkoutLandscapeTitleProps = Pick<
  RunningWorkoutContentParams,
  'currentState'
> & { headerTitle: string };

const _RunningWorkoutLandscapeTitle = ({
  headerTitle,
  currentState: { currentPhase, totalDurationMs, totalElapsedMs },
}: RunningWorkoutLandscapeTitleProps) => {
  const t = useAppTranslation();

  const phaseLabelKey = workoutPhaseToNameTranslateKey[currentPhase];
  const iconName = workoutPhaseToIconName[currentPhase];
  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];

  const totalTimePrefixLabel = `${t(
    'screens.runningWorkoutScreen.totalElapsedTime',
  ).toUpperCase()}${EMPTY_SPACE}`;

  const slashTextElement = (
    <AppText
      grow={false}
      shrink={false}
      category={'header'}>
      /
    </AppText>
  );

  const totalRemainingMs = totalDurationMs - totalElapsedMs;

  return (
    <AppRow
      grow={false}
      shrink
      gap={'s'}
      alignItems={'center'}>
      <WorkoutConfigBottomSheetIconAndTitle
        grow={false}
        label={t(phaseLabelKey).toUpperCase()}
        iconName={iconName}
        textColorStatus={phaseColorStatus}
      />
      {slashTextElement}
      <AppTimeView
        colorStatus={'text'}
        msLeft={totalRemainingMs}
        prefix={totalTimePrefixLabel}
      />
      {slashTextElement}
      <AppText
        grow={false}
        category={'header'}
        colorStatus={'textMuted'}>
        {headerTitle}
      </AppText>
    </AppRow>
  );
};

export const RunningWorkoutLandscapeTitle = memo(_RunningWorkoutLandscapeTitle);
