import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../../../../../../common/AppRow.tsx';

export type WorkoutConfigBottomSheetIconAndTitleProps = Pick<
  AppIconAndLabelProps,
  'label' | 'IconComponent'
>;

export const WorkoutConfigBottomSheetIconAndTitle = ({
  label,
  IconComponent,
}: WorkoutConfigBottomSheetIconAndTitleProps) => (
  <AppView>
    <AppRow
      gap={'s'}
      alignItems={'center'}>
      <AppIconAndLabel
        label={label}
        IconComponent={IconComponent}
        category={'header'}
      />
    </AppRow>
  </AppView>
);
