import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion, AppTextCategoryUnion } from '../../../../types/ui.ts';
import { LucideIcon } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

export const categoryToIconSize: Partial<Record<AppTextCategoryUnion, number>> =
  {
    header: 28,
    subHeader: 24,
  };

export type AppButtonIconAndLabelProps = Pick<
  AppTextProps,
  'textAlign' | 'category'
> & {
  label: string;
  textColorStatus?: AppColorUnion;
  IconComponent?: LucideIcon;
};

export const AppButtonIconAndLabel = ({
  label,
  IconComponent,
  textAlign,
  category,
  textColorStatus = 'text',
}: AppButtonIconAndLabelProps) => {
  const appColors = useAppThemedColors();

  const iconSize: number | undefined = category
    ? categoryToIconSize[category]
    : undefined;

  return (
    <>
      {IconComponent && (
        <IconComponent
          color={appColors[textColorStatus]}
          size={iconSize}
        />
      )}
      <AppText
        category={category}
        textAlign={textAlign}
        colorStatus={textColorStatus}
        numberOfLines={1}>
        {label}
      </AppText>
    </>
  );
};
