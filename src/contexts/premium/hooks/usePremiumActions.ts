import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { PURCHASES_ERROR_CODE } from 'react-native-purchases';
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
    | { status: 'restored' }
    | { status: 'notFound' }
    | { status: 'error'; code: PURCHASES_ERROR_CODE | undefined }
  > => {
    const outcome = await restorePurchases();
    if (outcome.status === 'error') {
      return { status: 'error', code: outcome.code };
    }
    const isPremium = hasPremiumEntitlement(outcome.customerInfo);
    void setIsPremium(isPremium);
    return isPremium ? { status: 'restored' } : { status: 'notFound' };
  }, [setIsPremium]);

  return { purchasePremium, restorePremium };
};
