import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion, AppTextCategoryUnion } from '../../../../types/ui.ts';
import { AppIcon, AppIconName } from '../../../common/AppIcon.tsx';

const smallIconSize = 16;

export const categoryToIconSize: Partial<Record<AppTextCategoryUnion, number>> =
  {
    header: 28,
    subHeader: 24,
    title: smallIconSize,
  };

export type AppIconAndLabelProps = Pick<
  AppTextProps,
  'textAlign' | 'category' | 'grow'
> & {
  label: string;
  textColorStatus?: AppColorUnion;
  iconColorStatus?: AppColorUnion;
  iconName?: AppIconName;
};

export const AppIconAndLabel = ({
  label,
  iconName,
  textAlign,
  category,
  grow,
  textColorStatus = 'text',
  iconColorStatus = textColorStatus,
}: AppIconAndLabelProps) => {
  const iconSize: number | undefined = category
    ? categoryToIconSize[category]
    : undefined;

  const iconSizeEvaluated: number = iconSize ?? smallIconSize;

  return (
    <>
      {iconName && (
        <AppIcon
          name={iconName}
          size={iconSizeEvaluated}
          colorStatus={iconColorStatus}
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
