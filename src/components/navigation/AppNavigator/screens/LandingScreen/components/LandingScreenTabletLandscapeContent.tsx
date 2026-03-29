import { WorkoutConfigButtons } from './WorkoutConfigButtons/WorkoutConfigButtons.tsx';
import {
  WorkoutConfigTimeView,
  WorkoutConfigTimeViewProps,
} from './WorkoutConfigButtons/components/WorkoutConfigTimeView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { LandingScreenFooter } from './LandingScreenFooter/LandingScreenFooter.tsx';
import { useAppSafeAreaPadding } from '../../../../../../hooks/useAppSafeAreaPadding.ts';
import { AppSizeUnion } from '../../../../../../types/ui.ts';

const PADDING_BOTTOM: AppSizeUnion = 'xl';

export const LandingScreenTabletLandscapeContent = ({
  control,
}: WorkoutConfigTimeViewProps) => {
  const { safeAreaPaddingBottom } = useAppSafeAreaPadding();

  return (
    <AppRow
      grow
      gap={'m'}
      alignItems={'stretch'}
      paddingBottom={safeAreaPaddingBottom}>
      <AppView
        grow
        flexBasis={0}
        paddingBottom={PADDING_BOTTOM}
        alignItems={'center'}
        justifyContent={'center'}>
        <WorkoutConfigTimeView control={control} />
      </AppView>
      <AppView
        gap={PADDING_BOTTOM}
        grow
        flexBasis={0}
        justifyContent={'flex-end'}>
        <WorkoutConfigButtons />
        <LandingScreenFooter />
      </AppView>
    </AppRow>
  );
};
