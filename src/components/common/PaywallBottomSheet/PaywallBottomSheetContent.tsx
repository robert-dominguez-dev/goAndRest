import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../AppView/AppView.tsx';
import { AppText } from '../AppText/AppText.tsx';
import { AppRow } from '../AppRow.tsx';
import { AppIcon } from '../AppIcon.tsx';
import { PremiumCtaButton } from '../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../locales/hooks/useAppTranslation.ts';
import { useIsPremium } from '../../../contexts/premium/hooks/useIsPremium.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../contexts/premium/hooks/usePremiumPrice.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../constants/common.ts';
import { TranslateKey } from '../../../locales/types.ts';

type PaywallBottomSheetContentProps = {
  isPurchasing: boolean;
  onBuyPress: () => void;
  onRestorePress: () => void;
};

const benefitTranslateKeys: TranslateKey[] = [
  'common.paywall.benefitHistory',
  'common.paywall.benefitChart',
  'common.paywall.benefitVoices',
  'common.paywall.benefitNoAds',
  'common.paywall.benefitBackup',
];

const PaywallBottomSheetContentComponent = ({
  isPurchasing,
  onBuyPress,
  onRestorePress,
}: PaywallBottomSheetContentProps) => {
  const t = useAppTranslation();

  const isPremium = useIsPremium();
  const price = usePremiumPrice();

  const benefits = benefitTranslateKeys.map(translateKey => (
    <AppRow
      key={translateKey}
      gap={'s'}
      alignItems={'center'}>
      <AppIcon
        name={'Check'}
        colorStatus={'primary'}
      />
      <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t(translateKey)}
      </AppText>
    </AppRow>
  ));

  return (
    <AppView gap={'l'}>
      <AppView
        alignItems={'center'}
        gap={'s'}>
        <AppIcon
          name={'Gem'}
          size={'xl'}
          colorStatus={'premium'}
        />
        <AppText
          category={'header'}
          textAlign={'center'}>
          {t('common.paywall.title')}
        </AppText>
        <AppText
          colorStatus={'textMuted'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t(
            isPremium
              ? 'common.paywall.subtitlePremium'
              : 'common.paywall.subtitleFree',
          )}
        </AppText>
      </AppView>
      <AppView gap={'m'}>{benefits}</AppView>
      {isPremium ? (
        <AppText
          category={'subHeader'}
          colorStatus={'primary'}
          textAlign={'center'}>
          {t('common.paywall.activeState')}
        </AppText>
      ) : (
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
      )}
    </AppView>
  );
};

export const PaywallBottomSheetContent = memo(
  PaywallBottomSheetContentComponent,
);
