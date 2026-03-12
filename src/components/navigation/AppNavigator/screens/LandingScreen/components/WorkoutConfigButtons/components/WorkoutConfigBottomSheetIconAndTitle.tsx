import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../../../../../../common/AppRow.tsx';

export type WorkoutConfigBottomSheetIconAndTitleProps = Pick<
  AppIconAndLabelProps,
  'label' | 'IconComponent' | 'textColorStatus' | 'grow'
>;

export const WorkoutConfigBottomSheetIconAndTitle = ({
  label,
  IconComponent,
  textColorStatus,
  grow,
}: WorkoutConfigBottomSheetIconAndTitleProps) => (
  <AppView
    shrink={!grow}
    grow={grow}>
    <AppRow
      gap={'s'}
      shrink={!grow}
      grow={grow}
      alignItems={'center'}>
      <AppIconAndLabel
        grow={grow}
        label={label}
        IconComponent={IconComponent}
        textColorStatus={textColorStatus}
        category={'header'}
      />
    </AppRow>
  </AppView>
);
