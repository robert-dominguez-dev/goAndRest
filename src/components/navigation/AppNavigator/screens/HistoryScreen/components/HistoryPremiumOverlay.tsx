import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AppView } from '../../../../../common/AppView/AppView.tsx';
import { AppText } from '../../../../../common/AppText/AppText.tsx';
import { AppIcon } from '../../../../../common/AppIcon.tsx';
import { PremiumCtaButton } from '../../../../../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { useAppTranslation } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { useAppTheme } from '../../../../../../contexts/AppThemeProvider.tsx';
import { useAppThemedColors } from '../../../../../../hooks/useAppThemedColors.ts';
import { AppTheme } from '../../../../../../types/common.ts';
import {
  FILL_CONTAINER_DIMENSION,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../../../../../constants/common.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../../../../../contexts/premium/hooks/usePremiumPrice.ts';

const BLUR_AMOUNT = 6;

type HistoryPremiumOverlayProps = {
  onUnlockPress: () => void;
};

const HistoryPremiumOverlayComponent = ({
  onUnlockPress,
}: HistoryPremiumOverlayProps) => {
  const t = useAppTranslation();
  const price = usePremiumPrice();

  const { theme } = useAppTheme();
  const appColors = useAppThemedColors();

  return (
    <AppView
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'m'}
      padding={'l'}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={theme === AppTheme.dark ? 'dark' : 'light'}
        blurAmount={BLUR_AMOUNT}
        reducedTransparencyFallbackColor={appColors.background}
      />
      <AppView
        position={'absolute'}
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundColorStatus={'semiTransparentBackground'}
      />
      <AppView
        gap={'xs'}
        alignItems={'center'}
        justifyContent={'center'}>
        <AppIcon
          name={'Gem'}
          size={'xl'}
          colorStatus={'premium'}
        />
        <AppText
          grow={false}
          category={'header'}
          textAlign={'center'}
          numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
          {t('screens.historyScreen.premiumOverlayTitle')}
        </AppText>
      </AppView>
      <AppText
        grow={false}
        textAlign={'center'}
        numberOfLines={UNLIMITED_NUMBER_OF_LINES}>
        {t('screens.historyScreen.premiumOverlayDescription')}
      </AppText>
      <AppView width={FILL_CONTAINER_DIMENSION}>
        <PremiumCtaButton
          label={t('screens.historyScreen.premiumOverlayUnlock', {
            priceString: price ?? PREMIUM_PRICE_PLACEHOLDER,
          })}
          onPress={onUnlockPress}
        />
      </AppView>
    </AppView>
  );
};

export const HistoryPremiumOverlay = memo(HistoryPremiumOverlayComponent);
