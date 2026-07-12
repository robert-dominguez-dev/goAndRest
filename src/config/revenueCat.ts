import { selectByPlatform } from './env.ts';

export const REVENUECAT_API_KEY = selectByPlatform({
  ios: 'appl_OKQOHeJNRDabSRCQiDxXgcWCtnO',
  android: 'goog_cqfpzKBvpzWRJyIxqXmAOMFyAiU',
});

export const REVENUECAT_PREMIUM_ENTITLEMENT_ID = 'premium' as const;

export const REVENUECAT_LIFETIME_PRODUCT_ID = selectByPlatform({
  ios: 'com.robertdominguez.goandrest.premium',
  android: 'com.goandrest.premium',
});
