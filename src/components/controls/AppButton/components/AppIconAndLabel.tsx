import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion, AppTextCategoryUnion } from '../../../../types/ui.ts';
import { LucideIcon } from 'lucide-react-native';
import { useAppThemedColors } from '../../../../hooks/useAppThemedColors.ts';

export const categoryToIconSize: Partial<Record<AppTextCategoryUnion, number>> =
  {
    header: 28,
    subHeader: 24,
    title: 16,
  };

export type AppIconAndLabelProps = Pick<
  AppTextProps,
  'textAlign' | 'category' | 'grow'
> & {
  label: string;
  textColorStatus?: AppColorUnion;
  IconComponent?: LucideIcon;
};

export const AppIconAndLabel = ({
  label,
  IconComponent,
  textAlign,
  category,
  grow,
  textColorStatus = 'text',
}: AppIconAndLabelProps) => {
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
        grow={grow}
        category={category}
        textAlign={textAlign}
        colorStatus={textColorStatus}>
        {label}
      </AppText>
    </>
  );
};
