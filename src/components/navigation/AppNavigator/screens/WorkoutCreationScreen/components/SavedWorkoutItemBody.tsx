import { AppWorkoutConfig } from '../../../../../../contexts/AppWorkoutsProvider/types.ts';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { SavedWorkoutItemBodyRow } from './SavedWorkoutItemBodyRow.tsx';
import { AppDivider } from '../../../../../common/AppDivider.tsx';
import { AppSizeUnion } from '../../../../../../types/ui.ts';

const DIVIDERS_SPACING: AppSizeUnion = 's';

export type SavedWorkoutItemBodyProps = {
  config: AppWorkoutConfig;
};

export const SavedWorkoutItemBody = ({ config }: SavedWorkoutItemBodyProps) => (
  <AppView paddingHorizontal={'m'}>
    <AppRow gap={DIVIDERS_SPACING}>
      <AppView
        grow
        flexBasis={0}>
        <SavedWorkoutItemBodyRow
          name={'work'}
          value={config.work}
        />
        <AppDivider />
        <SavedWorkoutItemBodyRow
          name={'rest'}
          value={config.rest}
        />
      </AppView>
      <AppRow paddingVertical={DIVIDERS_SPACING}>
        <AppDivider isVertical />
      </AppRow>
      <AppView
        grow
        flexBasis={0}>
        <SavedWorkoutItemBodyRow
          name={'series'}
          value={config.series}
          backgroundColorStatusOverride={'textMuted'}
        />
      </AppView>
    </AppRow>
    <AppDivider />
    <AppRow gap={DIVIDERS_SPACING}>
      <AppView
        grow
        flexBasis={0}>
        <SavedWorkoutItemBodyRow
          name={'brake'}
          value={config.brake}
          backgroundColorStatusOverride={'brakeStrong'}
        />
      </AppView>
      <AppRow paddingVertical={DIVIDERS_SPACING}>
        <AppDivider isVertical />
      </AppRow>
      <AppView
        grow
        shrink
        flexBasis={0}>
        <SavedWorkoutItemBodyRow
          name={'rounds'}
          value={config.rounds}
          backgroundColorStatusOverride={'textMuted'}
        />
      </AppView>
    </AppRow>
  </AppView>
);
