import { useAtomValue } from 'jotai';
import { premiumPriceAtom } from '../../atoms.ts';

// Neutral placeholder shown wherever the price is displayed before
// RevenueCat has resolved the real, localized `priceString`.
export const PREMIUM_PRICE_PLACEHOLDER = '?';

export const usePremiumPrice = (): string | null =>
  useAtomValue(premiumPriceAtom);
