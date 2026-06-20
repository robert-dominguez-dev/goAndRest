import { AppText } from '../AppText/AppText.tsx';

export type PremiumCharacterLockBadgeProps = {
  isActive: boolean;
  label?: string;
};

const LOCKED_EMOJI = '🔒';

export const PremiumCharacterLockBadge = ({
  isActive,
  label,
}: PremiumCharacterLockBadgeProps) => (
  <AppText
    category={'subHeader'}
    colorStatus={'textMuted'}>
    {isActive ? `(${label})` : LOCKED_EMOJI}
  </AppText>
);
