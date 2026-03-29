import { TranslateKey } from '../../../../../locales/types.ts';
import { AppIconName } from '../../../../common/AppIcon.tsx';
import { AppColorUnion } from '../../../../../types/ui.ts';
import { AppSelectionBottomSheetItemTextProps } from '../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';

export type SettingValueProps = {
  labelTranslateKey: TranslateKey;
  iconName?: AppIconName;
  iconColorStatus?: AppColorUnion;
  imageProps?: AppSelectionBottomSheetItemTextProps['imageProps'];
  previewAudioUrl?: string;
};
