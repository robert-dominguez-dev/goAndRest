import { AppRow } from '../../../../../common/AppRow.tsx';
import { memo } from 'react';
import { WorkoutTimerComputedState } from '../types.ts';
import { ArrowBigRightDash } from 'lucide-react-native';
import { categoryToIconSize } from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { RunningWorkoutCounterText } from './RunningWorkoutCounterText.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';

type RunningWorkoutCounterProps = Pick<
  WorkoutTimerComputedState,
  'currentSeries' | 'currentRound'
> & {
  totalSeries: number;
  totalRounds: number;
};

const RunningWorkoutCounterComponent = ({
  currentSeries,
  currentRound,
  totalSeries,
  totalRounds,
}: RunningWorkoutCounterProps) => {
  const t = useAppTranslation();

  const { textMuted } = useAppThemedColors();

  const shouldDisplayRoundCounter = totalRounds > 1;

  return (
    <AppRow alignItems={'flex-end'}>
      <RunningWorkoutCounterText
        label={t('screens.runningWorkoutScreen.descriptionTexts.set')}
        current={currentSeries}
        total={totalSeries}
      />
      {shouldDisplayRoundCounter && (
        <>
          <AppView
            paddingHorizontal={'sm'}
            paddingBottom={'xs'}>
            <ArrowBigRightDash
              color={textMuted}
              size={categoryToIconSize.subHeader}
            />
          </AppView>
          <RunningWorkoutCounterText
            label={t('screens.runningWorkoutScreen.descriptionTexts.round')}
            current={currentRound}
            total={totalRounds}
          />
        </>
      )}
    </AppRow>
  );
};

export const RunningWorkoutCounter = memo(RunningWorkoutCounterComponent);
