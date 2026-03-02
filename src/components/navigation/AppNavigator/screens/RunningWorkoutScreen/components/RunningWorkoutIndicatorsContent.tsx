import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppTimeView } from '../../../../../common/AppTimeView.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { memo } from 'react';
import { WorkoutTimerState } from '../types.ts';
import {
  workoutPhaseToIconComponent,
  workoutPhaseToNameTranslateKey,
  workoutPhaseToTimerColorStatus,
} from '../constants.ts';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppSize } from '../../../../../../types/ui.ts';
import { getByScreenWidth } from '../../../../../../helpers/getByScreenWidth.ts';

const TIME_FONT_SIZE = getByScreenWidth({
  small: 100,
  standard: 108,
});

type RunningWorkoutIndicatorsContentProps = Pick<
  WorkoutTimerState,
  'currentPhase' | 'phaseRemainingMs' | 'totalElapsedMs'
>;

const RunningWorkoutIndicatorsContentComponent = ({
  currentPhase,
  phaseRemainingMs,
  totalElapsedMs,
}: RunningWorkoutIndicatorsContentProps) => {
  const t = useAppTranslation();

  const phaseLabelKey = workoutPhaseToNameTranslateKey[currentPhase];
  const phaseColorStatus = workoutPhaseToTimerColorStatus[currentPhase];
  const IconComponent = workoutPhaseToIconComponent[currentPhase];

  const appColors = useAppThemedColors();

  return (
    <AppView
      grow
      alignItems={'center'}
      justifyContent={'center'}>
      <AppView
        gap={'s'}
        alignItems={'center'}
        justifyContent={'center'}>
        <IconComponent
          size={AppSize.ml}
          color={appColors[phaseColorStatus]}
        />
        <AppText
          grow={false}
          colorStatus={phaseColorStatus}
          category={'subHeader'}>
          {t(phaseLabelKey).toUpperCase()}
        </AppText>
        <AppTimeView
          colorStatus={phaseColorStatus}
          fontSizeOverride={TIME_FONT_SIZE}
          msLeft={phaseRemainingMs}
        />
      </AppView>
      <AppView gap={'xxs'}>
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
