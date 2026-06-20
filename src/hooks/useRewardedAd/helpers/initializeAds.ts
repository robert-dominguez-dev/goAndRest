import mobileAds, { AdsConsent } from 'react-native-google-mobile-ads';

let isInitialized = false;
let initializationPromise: Promise<boolean> | null = null;

const initializeAds = async (): Promise<boolean> => {
  try {
    const consentInfo = await AdsConsent.gatherConsent();

    if (!consentInfo.canRequestAds) {
      return false;
    }
  } catch {
    return false;
  }

  await mobileAds().initialize();

  return true;
};

/**
 * Attempted once at module load (best effort), and retried on demand
 * right before showing an ad if it didn't succeed yet - e.g. there was
 * no network at app startup but there is now. Once it succeeds, it's
 * cached for the rest of the session (no need to re-gather consent
 * before every single ad).
 */
export const ensureAdsInitialized = (): Promise<boolean> => {
  if (isInitialized) {
    return Promise.resolve(true);
  }

  if (!initializationPromise) {
    initializationPromise = initializeAds().then(success => {
      isInitialized = success;
      initializationPromise = null;
      return success;
    });
  }

  return initializationPromise;
};

void ensureAdsInitialized();
