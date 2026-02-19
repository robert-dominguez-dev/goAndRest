import { useAppBottomSheet } from '../../../../../common/AppBottomSheet/hooks/useAppBottomSheet.tsx';
import { AppBottomSheetProps } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import {
  WorkoutConfigBottomSheetIconAndTitle,
  WorkoutConfigBottomSheetIconAndTitleProps,
} from '../../LandingScreen/components/WorkoutConfigButtons/components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import { useLastValueSnapshot } from '../../LandingScreen/components/WorkoutConfigButtons/hooks/useLastValueSnapshot.tsx';
import {
  WorkoutSettingsBottomSheetContent,
  WorkoutSettingsBottomSheetContentProps,
} from '../components/WorkoutSettingsBottomSheetContent.tsx';
import { useAtom } from 'jotai';

type UseWorkoutSettingsBottomSheetParams = Pick<
  WorkoutConfigBottomSheetIconAndTitleProps,
  'IconComponent'
> &
  Pick<AppBottomSheetProps, 'backgroundColorStatus'> &
  Pick<
    WorkoutSettingsBottomSheetContentProps,
    'description' | 'durationAtom'
  > & {
    title: string;
  };

export const useWorkoutSettingsBottomSheet = ({
  title,
  description,
  IconComponent,
  backgroundColorStatus,
  durationAtom,
}: UseWorkoutSettingsBottomSheetParams) => {
  const [duration, setDuration] = useAtom(durationAtom);

  const { takeSnapshot, clearSnapshot, revertChanges } =
    useLastValueSnapshot(setDuration);

  const { bottomSheet, handleOpen } = useAppBottomSheet();

  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <WorkoutSettingsBottomSheetContent
      description={description}
      onConfirm={clearSnapshot}
      onClose={onClose}
      durationAtom={durationAtom}
    />
  );

  const openWorkoutSettingsBottomSheet = () => {
    takeSnapshot(duration);
    handleOpen({
      renderContent,
      backgroundColorStatus,
      onAccessoryRightPress: revertChanges,
      title: (
        <WorkoutConfigBottomSheetIconAndTitle
          label={title}
          IconComponent={IconComponent}
        />
      ),
    });
  };

  return { bottomSheet, openWorkoutSettingsBottomSheet, duration };
};
