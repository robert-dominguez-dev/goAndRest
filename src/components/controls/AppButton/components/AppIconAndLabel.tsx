import { AppText, AppTextProps } from '../../../common/AppText/AppText.tsx';
import { AppColorUnion, AppTextCategoryUnion } from '../../../../types/ui.ts';
import { AppIcon, AppIconName } from '../../../common/AppIcon.tsx';
import { AppView } from '../../../common/AppView/AppView.tsx';

const smallIconSize = 16;

export const categoryToIconSize: Partial<Record<AppTextCategoryUnion, number>> =
  {
    header: 32,
    subHeader: 24,
    title: smallIconSize,
  };

export const categoryToIconVerticalAdjustment: Partial<
  Record<AppTextCategoryUnion, number>
> = {
  header: 1,
  subHeader: 0,
  title: 0,
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

  const iconVerticalAdjustment: number = category
    ? categoryToIconVerticalAdjustment[category] ?? 0
    : 0;

  return (
    <>
      {iconName && (
        <AppView paddingTop={iconVerticalAdjustment}>
          <AppIcon
            name={iconName}
            size={iconSizeEvaluated}
            colorStatus={iconColorStatus}
          />
        </AppView>
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
