import { AppView } from '../../../../../../../common/AppView/AppView.tsx';
import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../../../../../../common/AppRow.tsx';

export type WorkoutConfigBottomSheetIconAndTitleProps = Pick<
  AppIconAndLabelProps,
  'label' | 'iconName' | 'textColorStatus' | 'grow'
>;

export const WorkoutConfigBottomSheetIconAndTitle = ({
  label,
  iconName,
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
        iconName={iconName}
        textColorStatus={textColorStatus}
        category={'header'}
      />
    </AppRow>
  </AppView>
);
