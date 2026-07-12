import Purchases, {
  CustomerInfo,
  CustomerInfoUpdateListener,
  PRODUCT_CATEGORY,
  PurchasesPackage,
  PurchasesStoreProduct,
} from 'react-native-purchases';
import {
  REVENUECAT_API_KEY,
  REVENUECAT_LIFETIME_PRODUCT_ID,
  REVENUECAT_PREMIUM_ENTITLEMENT_ID,
} from '../config/revenueCat.ts';
import { logCustomEvent } from '../components/navigation/helpers/logCustomEvent.ts';
import { getErrorMessage } from '../helpers/getErrorMessage.ts';

export type PurchaseOutcome =
  | { status: 'success'; isPremium: boolean }
  | { status: 'cancelled' }
  | { status: 'error' };

export const configurePurchases = async (): Promise<void> => {
  try {
    if (await Purchases.isConfigured()) {
      return;
    }
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  } catch (error) {
    void logCustomEvent('purchases_configure_failure', {
      errorMessage: getErrorMessage(error),
    });
  }
};

const ensureIsConfigured = async () => {
  if (!(await Purchases.isConfigured())) {
    await configurePurchases();
  }
};

export const getCurrentCustomerInfo =
  async (): Promise<CustomerInfo | null> => {
    try {
      await ensureIsConfigured();
      return await Purchases.getCustomerInfo();
    } catch (error) {
      void logCustomEvent('customer_info_fetch_failure', {
        errorMessage: getErrorMessage(error),
      });
      return null;
    }
  };

export const hasPremiumEntitlement = (customerInfo: CustomerInfo): boolean =>
  !!customerInfo.entitlements.active[REVENUECAT_PREMIUM_ENTITLEMENT_ID];

export const getLifetimePackage =
  async (): Promise<PurchasesPackage | null> => {
    try {
      await ensureIsConfigured();
      const offerings = await Purchases.getOfferings();
      return (
        offerings.current?.lifetime ??
        offerings.current?.availablePackages?.[0] ??
        null
      );
    } catch (error) {
      void logCustomEvent('offerings_fetch_failure', {
        errorMessage: getErrorMessage(error),
      });
      return null;
    }
  };

const getLifetimeStoreProduct =
  async (): Promise<PurchasesStoreProduct | null> => {
    try {
      await ensureIsConfigured();
      const products = await Purchases.getProducts(
        [REVENUECAT_LIFETIME_PRODUCT_ID],
        PRODUCT_CATEGORY.NON_SUBSCRIPTION,
      );
      return products[0] ?? null;
    } catch (error) {
      void logCustomEvent('offerings_fetch_failure', {
        errorMessage: getErrorMessage(error),
      });
      return null;
    }
  };

export const getLifetimePriceString = async (): Promise<string | null> => {
  const lifetimePackage = await getLifetimePackage();
  if (lifetimePackage) {
    return lifetimePackage.product.priceString;
  }
  const lifetimeProduct = await getLifetimeStoreProduct();
  return lifetimeProduct?.priceString ?? null;
};

const toPurchaseErrorOutcome = (error: unknown): PurchaseOutcome => {
  const purchaseError = error as { userCancelled?: boolean } | undefined;
  if (purchaseError?.userCancelled) {
    return { status: 'cancelled' };
  }
  void logCustomEvent('purchase_failure', {
    errorMessage: getErrorMessage(error),
  });
  return { status: 'error' };
};

export const purchaseLifetime = async (): Promise<PurchaseOutcome> => {
  await ensureIsConfigured();
  const lifetimePackage = await getLifetimePackage();
  if (lifetimePackage) {
    try {
      const { customerInfo } = await Purchases.purchasePackage(lifetimePackage);
      return {
        status: 'success',
        isPremium: hasPremiumEntitlement(customerInfo),
      };
    } catch (error) {
      return toPurchaseErrorOutcome(error);
    }
  }

  const lifetimeProduct = await getLifetimeStoreProduct();
  if (!lifetimeProduct) {
    return { status: 'error' };
  }
  try {
    const { customerInfo } = await Purchases.purchaseStoreProduct(
      lifetimeProduct,
    );
    return {
      status: 'success',
      isPremium: hasPremiumEntitlement(customerInfo),
    };
  } catch (error) {
    return toPurchaseErrorOutcome(error);
  }
};

export const restorePurchases = async (): Promise<CustomerInfo | null> => {
  try {
    await ensureIsConfigured();
    return await Purchases.restorePurchases();
  } catch (error) {
    void logCustomEvent('restore_purchases_failure', {
      errorMessage: getErrorMessage(error),
    });
    return null;
  }
};

export const addCustomerInfoUpdateListener = (
  listener: CustomerInfoUpdateListener,
): (() => void) => {
  Purchases.addCustomerInfoUpdateListener(listener);
  return () => {
    Purchases.removeCustomerInfoUpdateListener(listener);
  };
};
