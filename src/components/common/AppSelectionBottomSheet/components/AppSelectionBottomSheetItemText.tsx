import {
  AppIconAndLabel,
  AppIconAndLabelProps,
} from '../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { AppRow } from '../../AppRow.tsx';
import { AppSizeUnion } from '../../../../types/ui.ts';
import { AppImage, AppImageProps } from '../../AppImage.tsx';
import { AppView } from '../../AppView/AppView.tsx';

export const APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION: AppSizeUnion = 's';

export type AppSelectionBottomSheetItemTextProps = Pick<
  AppIconAndLabelProps,
  'label' | 'IconComponent' | 'iconColorStatus' | 'textColorStatus'
> & {
  imageProps?: Required<
    Pick<AppImageProps, 'illustrationName' | 'width' | 'height'>
  >;
};

export const AppSelectionBottomSheetItemText = ({
  label,
  IconComponent,
  imageProps,
  textColorStatus = 'textMuted',
  iconColorStatus = textColorStatus,
}: AppSelectionBottomSheetItemTextProps) => (
  <AppRow
    gap={APP_BOTTOM_SHEET_ICON_LABEL_GAP_UNION}
    alignItems={'center'}>
    {!!imageProps && (
      <AppView paddingBottom={'xs'}>
        <AppImage {...imageProps} />
      </AppView>
    )}
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
