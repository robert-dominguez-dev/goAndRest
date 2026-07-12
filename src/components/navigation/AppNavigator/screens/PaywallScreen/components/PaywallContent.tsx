import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppIcon, AppIconName } from '../../../../../common/AppIcon.tsx';
import { PremiumCtaButton } from '../../../../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useIsPremium } from '../../../../../../contexts/premium/hooks/useIsPremium.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../../../../contexts/premium/hooks/usePremiumPrice.ts';
import { UNLIMITED_NUMBER_OF_LINES } from '../../../../../../constants/common.ts';
import { TranslateKey } from '../../../../../../locales/types.ts';

type PaywallContentProps = {
  isPurchasing: boolean;
  onBuyPress: () => void;
  onRestorePress: () => void;
};

const benefits: { icon: AppIconName; translateKey: TranslateKey }[] = [
  { icon: 'History', translateKey: 'common.paywall.benefitHistory' },
  { icon: 'TrendingUp', translateKey: 'common.paywall.benefitChart' },
  { icon: 'Speech', translateKey: 'common.paywall.benefitVoices' },
  { icon: 'BellOff', translateKey: 'common.paywall.benefitNoAds' },
  { icon: 'Database', translateKey: 'common.paywall.benefitBackup' },
];

const PaywallContentComponent = ({
  isPurchasing,
  onBuyPress,
  onRestorePress,
}: PaywallContentProps) => {
  const t = useAppTranslation();

  const isPremium = useIsPremium();
  const price = usePremiumPrice();

  return (
    <AppView gap={'xl'}>
      <AppView
        alignItems={'center'}
        gap={'s'}>
        <AppView
          width={84}
          height={84}
          borderRadius={'l'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColorStatus={'premiumSemiTransparent'}>
          <AppIcon
            name={'Gem'}
            size={'xl'}
            colorStatus={'premium'}
          />
        </AppView>
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

      <AppView gap={'m'}>
        {benefits.map(({ icon, translateKey }) => (
          <AppRow
            key={translateKey}
            gap={'m'}
            alignItems={'center'}>
            <AppView
              grow={false}
              width={42}
              height={42}
              borderRadius={'s'}
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColorStatus={'backgroundAlt'}>
              <AppIcon
                name={icon}
                colorStatus={'premium'}
              />
            </AppView>
            <AppText numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
              {t(translateKey)}
            </AppText>
          </AppRow>
        ))}
      </AppView>

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

export const PaywallContent = memo(PaywallContentComponent);
