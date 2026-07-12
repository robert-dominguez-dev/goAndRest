import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { PremiumCtaButton } from '../../../../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useIsPremium } from '../../../../../../contexts/premium/hooks/useIsPremium.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../../../../contexts/premium/hooks/usePremiumPrice.ts';

type PaywallFooterProps = {
  isPurchasing: boolean;
  onBuyPress: () => void;
  onRestorePress: () => void;
};

const PaywallFooterComponent = ({
  isPurchasing,
  onBuyPress,
  onRestorePress,
}: PaywallFooterProps) => {
  const t = useAppTranslation();

  const isPremium = useIsPremium();
  const price = usePremiumPrice();

  if (isPremium) {
    return (
      <AppText
        category={'subHeader'}
        colorStatus={'primary'}
        textAlign={'center'}>
        {t('common.paywall.activeState')}
      </AppText>
    );
  }

  return (
    <AppView gap={'sm'}>
      <PremiumCtaButton
        label={t('common.paywall.buyButton', {
          priceString: price ?? PREMIUM_PRICE_PLACEHOLDER,
        })}
        onPress={onBuyPress}
        disabled={isPurchasing || price === null}
      />
      <AppText
        category={'title'}
        colorStatus={'textMuted'}
        textAlign={'center'}>
        {t('common.paywall.oneTimeNote')}
      </AppText>
      <Pressable
        onPress={getOnPressWithHapticFeedbackConditionally(onRestorePress)}>
        <AppText
          category={'content'}
          colorStatus={'inputTextMuted'}
          textAlign={'center'}>
          {t('common.paywall.restore')}
        </AppText>
      </Pressable>
    </AppView>
  );
};

export const PaywallFooter = memo(PaywallFooterComponent);
