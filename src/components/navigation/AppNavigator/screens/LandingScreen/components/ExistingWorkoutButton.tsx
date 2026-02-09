import {
  AppRoundedButton,
  AppRoundedButtonProps,
} from '../../../../../controls/AppRoundedButton/AppRoundedButton.tsx';
import { AppGradientColorUnion } from '../../../../../../constants/colors.ts';
import { ChildrenProp } from '../../../../../../types/common.ts';

type ExistingWorkoutButtonProps = ChildrenProp &
  Pick<AppRoundedButtonProps, 'onPress'> & {
    isSelected: boolean;
  };

export const ExistingWorkoutButton = ({
  children,
  onPress,
  isSelected,
}: ExistingWorkoutButtonProps) => {
  const status: AppGradientColorUnion = isSelected ? 'primary' : 'grayscale';

  return (
    <AppRoundedButton
      onPress={onPress}
      status={status}
      size={'s'}
      borderRadiusLevel={'small'}>
      {children}
    </AppRoundedButton>
  );
};
