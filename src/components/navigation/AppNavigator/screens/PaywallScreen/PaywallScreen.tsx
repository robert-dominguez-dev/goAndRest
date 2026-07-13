import { AppScreenLayout } from '../../../../common/AppScreenLayout/AppScreenLayout.tsx';
import { ScreenProps } from '../../../types.ts';
import { AppNavigatorScreen, AppNavigatorScreenParams } from '../../types.ts';
import { PaywallContent } from './components/PaywallContent.tsx';
import { PaywallFooter } from './components/PaywallFooter.tsx';
import { usePaywallPurchase } from './hooks/usePaywallPurchase.tsx';

type PaywallScreenProps = ScreenProps<
  AppNavigatorScreenParams,
  AppNavigatorScreen.PaywallScreen
>;

// A single space keeps the header bar (and its close button) present without a
// duplicate title - the big "Go&Rest Premium" lives in the hero below.
const EMPTY_HEADER_TITLE = ' ';

export const PaywallScreen = ({ navigation }: PaywallScreenProps) => {
  const { isPurchasing, handleBuyPress, handleRestorePress, popUps } =
    usePaywallPurchase(navigation.goBack);

  return (
    <>
      <AppScreenLayout
        scrollable
        headerTitle={EMPTY_HEADER_TITLE}
        headerAccessoryLeftIconName={'X'}
        onHeaderAccessoryLeftPress={navigation.goBack}
        footer={
          <PaywallFooter
            isPurchasing={isPurchasing}
            onBuyPress={handleBuyPress}
            onRestorePress={handleRestorePress}
          />
        }>
        <PaywallContent />
      </AppScreenLayout>
      {popUps}
    </>
  );
};
