import { TranslateKey } from '../../../../../locales/types.ts';
import { LucideIcon } from 'lucide-react-native';
import { AppColorUnion } from '../../../../../types/ui.ts';

export type SettingValueProps = {
  labelTranslateKey: TranslateKey;
  IconComponent: LucideIcon;
  iconColorStatus?: AppColorUnion;
};
