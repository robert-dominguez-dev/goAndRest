import { useAppTranslation } from '../../../../../locales/hooks/useAppTranslation.ts';
import { memo } from 'react';
import {
  workoutPhaseToIconComponent,
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
import { fontCategoryStyles } from '../../../../../constants/fonts.ts';

type RunningWorkoutLandscapeTitleProps = Pick<
  RunningWorkoutContentParams,
  'currentState'
> & { headerTitle: string };

const _RunningWorkoutLandscapeTitle = ({
  headerTitle,
  currentState: { currentPhase, totalElapsedMs },
}: RunningWorkoutLandscapeTitleProps) => {
  const t = useAppTranslation();

  const phaseLabelKey = workoutPhaseToNameTranslateKey[currentPhase];
  const IconComponent = workoutPhaseToIconComponent[currentPhase];
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

  return (
    <AppRow
      grow={false}
      shrink
      gap={'s'}
      alignItems={'center'}>
      <WorkoutConfigBottomSheetIconAndTitle
        grow={false}
        label={t(phaseLabelKey).toUpperCase()}
        IconComponent={IconComponent}
        textColorStatus={phaseColorStatus}
      />
      {slashTextElement}
      <AppTimeView
        colorStatus={'text'}
        fontSizeOverride={fontCategoryStyles.header.fontSize}
        msLeft={totalElapsedMs}
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
