import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppTimeView } from '../../../../../common/AppTimeView.tsx';
import { AppView, AppViewProps, } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { memo } from 'react';
import { WorkoutTimerState } from '../types.ts';
import {
  workoutPhaseToIconName,
  workoutPhaseToNameTranslateKey,
  workoutPhaseToTimerColorStatus,
} from '../constants.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';

type RunningWorkoutIndicatorsContentProps = Pick<
  WorkoutTimerState,
  'currentPhase' | 'phaseRemainingMs' | 'totalElapsedMs'
> &
  Pick<AppViewProps, 'padding'> & { timeFontSize: number };

const RunningWorkoutIndicatorsContentComponent = ({
  currentPhase,
  phaseRemainingMs,
  totalElapsedMs,
  timeFontSize,
  padding,
}: RunningWorkoutIndicatorsContentProps) => {
  const t = useAppTranslation();

  const phaseLabelKey = workoutPhaseToNameTranslateKey[currentPhase];
  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];
  const iconName = workoutPhaseToIconName[currentPhase];

  return (
    <AppView
      grow
      shrink
      padding={padding}
      gap={'xs'}
      alignItems={'center'}
      justifyContent={'center'}>
      <AppView
        grow
        shrink
        gap={'xs'}
        alignItems={'center'}
        justifyContent={'center'}>
        <AppIcon
          name={iconName}
          colorStatus={phaseColorStatus}
        />
        <AppText
          grow={false}
          colorStatus={phaseColorStatus}
          category={'subHeader'}>
          {t(phaseLabelKey).toUpperCase()}
        </AppText>
      </AppView>
      <AppTimeView
        colorStatus={phaseColorStatus}
        fontSizeOverride={timeFontSize}
        msLeft={phaseRemainingMs}
      />
      <AppView
        grow
        shrink
        gap={'xxs'}
        alignItems={'center'}
        justifyContent={'center'}>
        <AppText
          grow={false}
          colorStatus={'text'}
          category={'title'}>
          {t('screens.runningWorkoutScreen.totalElapsedTime').toUpperCase()}
        </AppText>
        <AppTimeView
          colorStatus={'text'}
          fontSizeOverride={'l'}
          msLeft={totalElapsedMs}
        />
      </AppView>
    </AppView>
  );
};

export const RunningWorkoutIndicatorsContent = memo(
  RunningWorkoutIndicatorsContentComponent,
);
