import { AppView } from '../../../../../../common/AppView/AppView.tsx';
import { memo } from 'react';
import { WorkoutConfigButtonWithSheet } from './components/WorkoutConfigButtonWithSheet.tsx';
import { useIsWithoutPauses } from '../../hooks/useIsWithoutPauses.ts';
import { WorkoutConfigButton } from './components/WorkoutConfigButton.tsx';
import { WorkoutConfigVerticalButton } from './components/WorkoutConfigVerticalButton.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { AppSizeUnion } from '../../../../../../../types/ui.ts';
import { SavedWorkoutsButton } from './components/SavedWorkoutsButton.tsx';
import { useAppWorkouts } from '../../../../../../../contexts/AppWorkoutsProvider/AppWorkoutsProvider.tsx';

const GAP: AppSizeUnion = 's';

const WorkoutConfigButtonsComponent = () => {
  const { storedWorkouts } = useAppWorkouts();

  const isWithoutRest = useIsWithoutPauses('series', 'rest');
  const isWithoutRecovery = useIsWithoutPauses('rounds', 'recovery');

  return (
    <AppView gap={GAP}>
      {!!storedWorkouts.length && <SavedWorkoutsButton />}
      <AppRow gap={GAP}>
        <AppView
          grow
          gap={GAP}>
          <AppRow gap={GAP}>
            <AppView
              grow
              gap={GAP}>
              <WorkoutConfigButtonWithSheet
                name={'work'}
                ButtonComponent={WorkoutConfigButton}
              />
              <WorkoutConfigButtonWithSheet
                name={'rest'}
                disabled={isWithoutRest}
                ButtonComponent={WorkoutConfigButton}
              />
            </AppView>
            <WorkoutConfigButtonWithSheet
              name={'series'}
              ButtonComponent={WorkoutConfigVerticalButton}
            />
          </AppRow>
          <WorkoutConfigButtonWithSheet
            name={'recovery'}
            disabled={isWithoutRecovery}
            ButtonComponent={WorkoutConfigButton}
          />
        </AppView>
        <WorkoutConfigButtonWithSheet
          name={'rounds'}
          ButtonComponent={WorkoutConfigVerticalButton}
        />
      </AppRow>
    </AppView>
  );
};

export const WorkoutConfigButtons = memo(WorkoutConfigButtonsComponent);
