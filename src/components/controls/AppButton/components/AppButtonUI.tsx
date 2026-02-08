import { sizes } from '../../../../constants/ui.ts';
import { AppRow } from '../../../common/AppRow.tsx';
import { AppText } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion } from '../../../../types/ui.ts';
import { AppViewProps } from '../../../common/AppView.tsx';
import { LucideIcon } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

const { buttonHeight, buttonBorderRadius } = sizes;

const ICON_SIZE = 28;

export type AppButtonUIProps = Pick<
  AppViewProps,
  'opacity' | 'backgroundColorStatus'
> & {
  label: string;
  value: string;
  textColorStatus: AppColorUnion;
  IconComponent?: LucideIcon;
};

export const AppButtonUI = ({
  label,
  value,
  opacity,
  textColorStatus,
  backgroundColorStatus,
  IconComponent,
}: AppButtonUIProps) => {
  const appColors = useAppThemedColors();
  return (
    <AppRow
      gap={'s'}
      paddingHorizontal={'m'}
      alignItems={'center'}
      justifyContent={'space-between'}
      backgroundColorStatus={backgroundColorStatus}
      height={buttonHeight}
      borderRadius={buttonBorderRadius}
      opacity={opacity}>
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
      <AppText
        textAlign={'right'}
        category={'header'}
        colorStatus={textColorStatus}
        numberOfLines={1}>
        {value}
      </AppText>
    </AppRow>
  );
};
