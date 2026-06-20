import { ActivityIndicator } from 'react-native';
import { AppText } from '../AppText/AppText.tsx';
import { useAppThemedColors } from '../../../hooks/useAppThemedColors.ts';

export type PremiumCharacterLockBadgeProps = {
  isActive: boolean;
  isLoading?: boolean;
  label?: string;
};

const LOCKED_EMOJI = '🔒';

export const PremiumCharacterLockBadge = ({
  isActive,
  isLoading,
  label,
}: PremiumCharacterLockBadgeProps) => {
  const appColors = useAppThemedColors();

  if (isLoading) {
    return <ActivityIndicator color={appColors.textMuted} size={'small'} />;
  }

  return (
    <AppText
      category={'subHeader'}
      colorStatus={'textMuted'}>
      {isActive ? `(${label})` : LOCKED_EMOJI}
    </AppText>
  );
};
