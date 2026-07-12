/**
 * Single source of truth for every RevenueCat value the app needs.
 *
 * Everything here is still a PLACEHOLDER — replace each value with the real
 * one before a store release. The app already reads all of these from this
 * file, so filling them in here is enough; no other code needs to change.
 */

import { selectByPlatform } from './env.ts';

// TODO(user): real RC public SDK keys (RevenueCat dashboard -> Project
// settings -> API keys -> "Public app-specific API keys").
export const REVENUECAT_API_KEY = selectByPlatform({
  ios: 'appl_OKQOHeJNRDabSRCQiDxXgcWCtnO',
  android: 'goog_PLACEHOLDER_REPLACE_ME',
});

// TODO(user): must match the entitlement id configured in the RevenueCat
// dashboard -> Entitlements.
export const REVENUECAT_PREMIUM_ENTITLEMENT_ID = 'premium' as const;

// TODO(user): real store product id(s) (App Store Connect / Google Play
// Console), registered in RevenueCat -> Products and attached to the
// entitlement above.
export const REVENUECAT_LIFETIME_PRODUCT_ID = selectByPlatform({
  ios: 'com.robertdominguez.goandrest.premium',
  android: 'com.goandrest.premium.lifetime',
});
