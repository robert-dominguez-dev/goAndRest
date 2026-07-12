import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { isPremiumAtom } from '../../atoms.ts';
import {
  hasPremiumEntitlement,
  purchaseLifetime,
  PurchaseOutcome,
  restorePurchases,
} from '../../../services/purchasesService.ts';

export const usePremiumActions = () => {
  const setIsPremium = useSetAtom(isPremiumAtom);

  const purchasePremium = useCallback(async (): Promise<PurchaseOutcome> => {
    const outcome = await purchaseLifetime();
    if (outcome.status === 'success' && outcome.isPremium) {
      void setIsPremium(true);
    }
    return outcome;
  }, [setIsPremium]);

  const restorePremium = useCallback(async (): Promise<
    'restored' | 'notFound' | 'error'
  > => {
    const customerInfo = await restorePurchases();
    if (!customerInfo) {
      return 'error';
    }
    const isPremium = hasPremiumEntitlement(customerInfo);
    void setIsPremium(isPremium);
    return isPremium ? 'restored' : 'notFound';
  }, [setIsPremium]);

  return { purchasePremium, restorePremium };
};
