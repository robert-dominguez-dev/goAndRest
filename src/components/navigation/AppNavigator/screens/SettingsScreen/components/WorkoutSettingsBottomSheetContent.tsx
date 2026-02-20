import { memo } from 'react';
import {
  WorkoutConfigBottomSheetContentBase,
  WorkoutConfigBottomSheetContentBaseProps,
} from '../../LandingScreen/components/WorkoutConfigButtons/components/WorkoutConfigBottomSheetContentBase.tsx';
import { workoutSettingsButtonConfigMap } from '../../LandingScreen/constants.ts';
import {
  AppAtom,
  useDebouncedAtom,
} from '../../../../../../contexts/hooks/useDebouncedAtom.ts';

const { min, max, step, labelEveryNSteps, valueFormatter } =
  workoutSettingsButtonConfigMap.rest;

export type WorkoutSettingsBottomSheetContentProps = Pick<
  WorkoutConfigBottomSheetContentBaseProps,
  'description' | 'onConfirm' | 'onClose'
> & { durationAtom: AppAtom<number> };

const WorkoutSettingsBottomSheetContentComponent = ({
  description,
  onConfirm,
  onClose,
  durationAtom,
}: WorkoutSettingsBottomSheetContentProps) => {
  const [duration, setDuration] = useDebouncedAtom(durationAtom);

  return (
    <WorkoutConfigBottomSheetContentBase
      description={description}
      value={duration}
      onChange={setDuration}
      minValue={min}
      maxValue={max}
      step={step}
      labelEveryNSteps={labelEveryNSteps}
      valueFormatter={valueFormatter}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const WorkoutSettingsBottomSheetContent = memo(
  WorkoutSettingsBottomSheetContentComponent,
);
