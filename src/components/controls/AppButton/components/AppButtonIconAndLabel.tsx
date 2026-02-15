import { AppText } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion } from '../../../../types/ui.ts';
import { LucideIcon } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

const ICON_SIZE = 28;

export type AppButtonIconAndLabelProps = {
  label: string;
  textColorStatus?: AppColorUnion;
  IconComponent?: LucideIcon;
};

export const AppButtonIconAndLabel = ({
  label,
  IconComponent,
  textColorStatus = 'text',
}: AppButtonIconAndLabelProps) => {
  const appColors = useAppThemedColors();
  return (
    <>
      {IconComponent && (
        <IconComponent
          color={appColors[textColorStatus]}
          size={ICON_SIZE}
        />
      )}
      <AppText
        category={'header'}
        colorStatus={textColorStatus}
        numberOfLines={1}>
        {label}
      </AppText>
    </>
  );
};
