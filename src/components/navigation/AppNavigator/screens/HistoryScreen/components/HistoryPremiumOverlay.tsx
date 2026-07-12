import { memo } from 'react';
import { Pressable } from 'react-native';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppRow } from '../../../../../common/AppRow.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { AppFullScreenOverlay } from '../../../../../common/AppFullScreenOverlay.tsx';
import { PremiumCtaButton } from '../../../../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../../../../../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../../constants/common.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../../../../contexts/premium/hooks/usePremiumPrice.ts';

type HistoryPremiumOverlayProps = {
  onUnlockPress: () => void;
  onClose: () => void;
};

const HistoryPremiumOverlayComponent = ({
  onUnlockPress,
  onClose,
}: HistoryPremiumOverlayProps) => {
  const t = useAppTranslation();
  const price = usePremiumPrice();

  return (
    <AppFullScreenOverlay>
      <AppView
        width={FILL_CONTAINER_DIMENSION}
        grow>
        <AppRow>
          <AppView
            grow={false}
            padding={'xs'}>
            <Pressable
              onPress={getOnPressWithHapticFeedbackConditionally(onClose)}>
              <AppIcon
                name={'X'}
                colorStatus={'text'}
              />
            </Pressable>
          </AppView>
        </AppRow>
        <AppView
          grow
          justifyContent={'center'}
          alignItems={'center'}
          gap={'s'}
          paddingHorizontal={'m'}>
          <AppIcon
            name={'Gem'}
            size={'xl'}
            colorStatus={'premium'}
          />
          <AppText
            category={'header'}
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('screens.historyScreen.premiumOverlayTitle')}
          </AppText>
          <AppText
            textAlign={'center'}
            numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
            {t('screens.historyScreen.premiumOverlayDescription')}
          </AppText>
          <PremiumCtaButton
            label={t('screens.historyScreen.premiumOverlayUnlock', {
              priceString: price ?? PREMIUM_PRICE_PLACEHOLDER,
            })}
            onPress={onUnlockPress}
          />
        </AppView>
      </AppView>
    </AppFullScreenOverlay>
  );
};

export const HistoryPremiumOverlay = memo(HistoryPremiumOverlayComponent);
