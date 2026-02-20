import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';

type SettingsItemValueTextProps = Pick<
  AppIconAndLabelProps,
  'label' | 'IconComponent' | 'iconColorStatus'
>;

export const SettingsItemValueText = ({
  label,
  IconComponent,
  iconColorStatus,
}: SettingsItemValueTextProps) => (
  <AppRow
    gap={'sm'}
    alignItems={'center'}>
    <AppIconAndLabel
      grow={false}
      label={label}
      IconComponent={IconComponent}
      iconColorStatus={iconColorStatus}
      category={'subHeader'}
      textColorStatus={'textMuted'}
    />
  </AppRow>
);
