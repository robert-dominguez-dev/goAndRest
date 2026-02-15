import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { memo } from 'react';
import { WorkoutConfigButtonWithSheet } from './WorkoutConfigButtonWithSheet.tsx';
import { useIsWithoutPauses } from '../hooks/useIsWithoutPauses.ts';

const WorkoutConfigButtonsComponent = () => {
  const isWithoutRest = useIsWithoutPauses('series', 'rest');
  const isWithoutBrake = useIsWithoutPauses('rounds', 'brake');

  return (
    <AppView gap={'s'}>
      <WorkoutConfigButtonWithSheet name={'work'} />
      <WorkoutConfigButtonWithSheet name={'series'} />
      <WorkoutConfigButtonWithSheet
        name={'rest'}
        disabled={isWithoutRest}
      />
      <WorkoutConfigButtonWithSheet name={'rounds'} />
      <WorkoutConfigButtonWithSheet
        name={'brake'}
        disabled={isWithoutBrake}
      />
    </AppView>
  );
};

export const WorkoutConfigButtons = memo(WorkoutConfigButtonsComponent);
