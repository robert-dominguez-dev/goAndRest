import { WorkoutConfigButtons } from './WorkoutConfigButtons/WorkoutConfigButtons.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import {
  WorkoutConfigTimeView,
  WorkoutConfigTimeViewProps,
} from './WorkoutConfigButtons/components/WorkoutConfigTimeView.tsx';

export const LandingScreenContent = ({
  control,
}: WorkoutConfigTimeViewProps) => (
  <AppView
    grow
    gap={'m'}>
    <WorkoutConfigTimeView control={control} />
    <WorkoutConfigButtons />
  </AppView>
);
