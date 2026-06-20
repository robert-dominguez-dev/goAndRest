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
 * Called on demand right before showing an ad - e.g. there was no
 * network at the first attempt but there is now. Once it succeeds,
 * it's cached for the rest of the session (no need to re-gather
 * consent before every single ad). Deliberately not triggered eagerly
 * at module load - the native consent form could otherwise pop up the
 * moment the app starts, well before the user has opened the premium
 * sheet or read its description.
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
