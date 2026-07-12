import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useAtomValue } from 'jotai';
import { AppView } from './AppView/AppView.tsx';
import { AppText } from './AppText/AppText.tsx';
import { AppRow } from './AppRow.tsx';
import { AppIcon } from './AppIcon.tsx';
import { PremiumCtaButton } from '../controls/PremiumCtaButton/PremiumCtaButton.tsx';
import { getOnPressWithHapticFeedbackConditionally } from '../controls/helpers/getOnPressWithHapticFeedbackConditionally.ts';
import { useAppTranslation } from '../../locales/hooks/useAppTranslation.ts';
import { useAppTheme } from '../../contexts/AppThemeProvider.tsx';
import { useAppThemedColors } from '../../hooks/useAppThemedColors.ts';
import { useAppSafeAreaPadding } from '../../hooks/useAppSafeAreaPadding.ts';
import { AppTheme } from '../../types/common.ts';
import {
  FILL_CONTAINER_DIMENSION,
  POP_UP_Z_INDEX,
  UNLIMITED_NUMBER_OF_LINES,
} from '../../constants/common.ts';
import {
  PREMIUM_PRICE_PLACEHOLDER,
  usePremiumPrice,
} from '../../contexts/premium/hooks/usePremiumPrice.ts';
import { isHistoryPaywallVisibleAtom } from '../../contexts/atoms.ts';

const BLUR_AMOUNT = 6;

type HistoryPaywallOverlayProps = {
  onUnlockPress: () => void;
  onClose: () => void;
};

const HistoryPaywallOverlayComponent = ({
  onUnlockPress,
  onClose,
}: HistoryPaywallOverlayProps) => {
  const isVisible = useAtomValue(isHistoryPaywallVisibleAtom);

  const t = useAppTranslation();
  const price = usePremiumPrice();

  const { theme } = useAppTheme();
  const appColors = useAppThemedColors();
  const {
    safeAreaPaddingTop,
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
  } = useAppSafeAreaPadding();

  if (!isVisible) {
    return null;
  }

  return (
    <AppView
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={POP_UP_Z_INDEX}>
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
        paddingTop={safeAreaPaddingTop}
        paddingBottom={safeAreaPaddingBottom}
        paddingLeft={safeAreaPaddingLeft}
        paddingRight={safeAreaPaddingRight}
        backgroundColorStatus={'semiTransparentBackground'}>
        <AppRow>
          <AppView
            grow={false}
            padding={'s'}>
            <Pressable
              onPress={getOnPressWithHapticFeedbackConditionally(onClose)}>
              <AppIcon
                name={'ArrowLeft'}
                colorStatus={'text'}
              />
            </Pressable>
          </AppView>
        </AppRow>
        <AppView
          grow
          alignItems={'center'}
          justifyContent={'center'}
          gap={'m'}
          paddingHorizontal={'l'}>
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
      </AppView>
    </AppView>
  );
};

export const HistoryPaywallOverlay = memo(HistoryPaywallOverlayComponent);
