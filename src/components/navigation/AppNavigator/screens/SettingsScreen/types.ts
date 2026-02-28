import { TranslateKey } from '../../../../../locales/types.ts';
import { LucideIcon } from 'lucide-react-native';
import { AppColorUnion } from '../../../../../types/ui.ts';
import { AppSelectionBottomSheetItemTextProps } from '../../../../common/AppSelectionBottomSheet/components/AppSelectionBottomSheetItemText.tsx';
import { SoundPathByLanguage } from '../../../../../assets/types.ts';

export type SettingValueProps = {
  labelTranslateKey: TranslateKey;
  IconComponent?: LucideIcon;
  iconColorStatus?: AppColorUnion;
  imageProps?: AppSelectionBottomSheetItemTextProps['imageProps'];
  audioPathByLanguage?: SoundPathByLanguage;
};
