import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { getPressableOpacity } from '../../../../../controls/helpers/getPressableOpacity.ts';
import { getOnPressWithHapticFeedback } from '../../../../../controls/helpers/getOnPressWithHapticFeedback.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../../../../contexts/premium/hooks/usePremiumPrice.ts';

type ProBannerProps = {
  onPress: () => void;
};

const ProBannerComponent = ({ onPress }: ProBannerProps) => {
  const t = useAppTranslation();
  const price = usePremiumPrice();

  return (
    <Pressable onPress={getOnPressWithHapticFeedback(onPress)}>
      {({ pressed }) => {
        const opacity = getPressableOpacity({ pressed, disabled: false });

        return (
          <AppRow
            opacity={opacity}
            gap={'m'}
            alignItems={'center'}
            padding={'m'}
            paddingRight={'sm'}
            borderRadius={'m'}
            borderColorStatus={'premium'}
            backgroundColorStatus={'premiumSemiTransparent'}>
            <AppIcon
              name={'Gem'}
              size={'l'}
              colorStatus={'premium'}
            />
            <AppView
              grow
              gap={'xs'}>
              <AppText category={'subHeader'}>
                {t('common.paywall.title')}
              </AppText>
              <AppText
                category={'contentBold'}
                colorStatus={'textMuted'}>
                {t('screens.settingsScreen.proBannerSubtitle', {
                  priceString: price ?? PREMIUM_PRICE_PLACEHOLDER,
                })}
              </AppText>
            </AppView>
            <AppIcon
              name={'ChevronRight'}
              colorStatus={'premium'}
            />
          </AppRow>
        );
      }}
    </Pressable>
  );
};

export const ProBanner = memo(ProBannerComponent);
