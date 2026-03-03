import { AppBottomSheetProps } from '../../../../../common/AppBottomSheet/AppBottomSheet.tsx';
import {
  WorkoutConfigBottomSheetIconAndTitle,
  WorkoutConfigBottomSheetIconAndTitleProps,
} from '../../LandingScreen/components/WorkoutConfigButtons/components/WorkoutConfigBottomSheetIconAndTitle.tsx';
import {
  WorkoutSettingsBottomSheetContent,
  WorkoutSettingsBottomSheetContentProps,
} from '../components/WorkoutSettingsBottomSheetContent.tsx';
import { useSliderBottomSheet } from '../../../../../../hooks/useSliderBottomSheet.tsx';
import { useAtom } from 'jotai';

type UseWorkoutSettingBottomSheetParams = Pick<
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

export const useWorkoutSettingBottomSheet = ({
  title,
  description,
  IconComponent,
  backgroundColorStatus,
  durationAtom,
}: UseWorkoutSettingBottomSheetParams) => {
  const [duration, setDuration] = useAtom(durationAtom);

  const { bottomSheet, open, confirm, revert } = useSliderBottomSheet({
    getValue: () => duration,
    setValue: setDuration,
  });

  const renderContent = () => (
    <WorkoutSettingsBottomSheetContent
      description={description}
      durationAtom={durationAtom}
    />
  );

  const openWorkoutSettingsBottomSheet = () =>
    open({
      renderContent,
      backgroundColorStatus,
      onBottomSheetPress: confirm,
      onOverlayPress: revert,
      title: (
        <WorkoutConfigBottomSheetIconAndTitle
          label={title}
          IconComponent={IconComponent}
        />
      ),
    });

  return { bottomSheet, openWorkoutSettingsBottomSheet, duration };
};
