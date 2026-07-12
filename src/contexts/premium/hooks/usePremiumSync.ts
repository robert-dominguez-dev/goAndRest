import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isPremiumAtom, premiumPriceAtom } from '../../atoms.ts';
import {
  addCustomerInfoUpdateListener,
  configurePurchases,
  getCurrentCustomerInfo,
  getLifetimePriceString,
  hasPremiumEntitlement,
} from '../../../services/purchasesService.ts';

/**
 * Reconciles the persisted `isPremiumAtom` with RevenueCat on app start, and
 * keeps it in sync afterwards. A null customerInfo means the store state
 * could not be determined (offline / SDK error) - the persisted value is
 * kept as-is in that case. A resolved customerInfo is always applied,
 * including downgrading back to non-premium if the entitlement is gone.
 *
 * Also fetches the localized lifetime price once and stores it in
 * `premiumPriceAtom`, leaving it `null` if it can't be resolved.
 */
export const usePremiumSync = (): void => {
  const setIsPremium = useSetAtom(isPremiumAtom);
  const setPremiumPrice = useSetAtom(premiumPriceAtom);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await configurePurchases();

      const customerInfo = await getCurrentCustomerInfo();
      if (!cancelled && customerInfo) {
        void setIsPremium(hasPremiumEntitlement(customerInfo));
      }

      const priceString = await getLifetimePriceString();
      if (!cancelled && priceString) {
        void setPremiumPrice(priceString);
      }
    })();

    const unsubscribe = addCustomerInfoUpdateListener(customerInfo => {
      if (!cancelled) {
        void setIsPremium(hasPremiumEntitlement(customerInfo));
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [setIsPremium, setPremiumPrice]);
};
