import { AppView } from '../../../../../../common/AppView/AppView.tsx';
import { memo } from 'react';
import { WorkoutConfigButtonWithSheet } from './components/WorkoutConfigButtonWithSheet.tsx';
import { useIsWithoutPauses } from '../../hooks/useIsWithoutPauses.ts';
import { WorkoutConfigButton } from './components/WorkoutConfigButton.tsx';
import { WorkoutConfigVerticalButton } from './components/WorkoutConfigVerticalButton.tsx';
import { AppRow } from '../../../../../../common/AppRow.tsx';
import { AppSizeUnion } from '../../../../../../../types/ui.ts';

const GAP: AppSizeUnion = 's';

const WorkoutConfigButtonsComponent = () => {
  const isWithoutRest = useIsWithoutPauses('series', 'rest');
  const isWithoutBrake = useIsWithoutPauses('rounds', 'brake');

  return (
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
          name={'brake'}
          disabled={isWithoutBrake}
          ButtonComponent={WorkoutConfigButton}
        />
      </AppView>
      <WorkoutConfigButtonWithSheet
        name={'rounds'}
        ButtonComponent={WorkoutConfigVerticalButton}
      />
    </AppRow>
  );
};

export const WorkoutConfigButtons = memo(WorkoutConfigButtonsComponent);
