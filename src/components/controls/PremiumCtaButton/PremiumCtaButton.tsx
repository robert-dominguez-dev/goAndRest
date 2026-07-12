import { memo } from 'react';
import { AppButton } from '../AppButton/AppButton.tsx';

export type PremiumCtaButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const PremiumCtaButtonComponent = ({
  label,
  onPress,
  disabled,
}: PremiumCtaButtonProps) => (
  <AppButton
    label={label}
    onPress={onPress}
    disabled={disabled}
    backgroundColorStatus={'premium'}
    textColorStatus={'onPremium'}
  />
);

export const PremiumCtaButton = memo(PremiumCtaButtonComponent);
