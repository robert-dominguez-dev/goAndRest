import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppSizeUnion } from '../../../../types/ui.ts';

export const APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION: AppSizeUnion = 's';

type AppSelectionBottomSheetItemTextProps = Pick<
  AppIconAndLabelProps,
  'label' | 'IconComponent' | 'iconColorStatus' | 'textColorStatus'
>;

export const AppSelectionBottomSheetItemText = ({
  label,
  IconComponent,
  textColorStatus = 'textMuted',
  iconColorStatus = textColorStatus,
}: AppSelectionBottomSheetItemTextProps) => (
  <AppRow
    gap={APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION}
    alignItems={'center'}>
    <AppIconAndLabel
      grow={false}
      label={label}
      IconComponent={IconComponent}
      iconColorStatus={iconColorStatus}
      textColorStatus={textColorStatus}
      category={'subHeader'}
    />
  </AppRow>
);
