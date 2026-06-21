import {
  AdsConsent,
  AdsConsentUserChoices,
} from 'react-native-google-mobile-ads';

export type PersonalizedAdsStatus =
  | 'personalized'
  | 'general'
  | 'limited'
  | 'off'
  | 'unknown';

/**
 * `selectBasicAds`/`selectPersonalisedAds`/`createAPersonalisedAdsProfile`
 * are the IAB TCF purposes that actually decide ad personalization -
 * the rest (geolocation, market research, content personalization...)
 * are orthogonal to it. `activelyScanDeviceCharacteristicsForIdentification`
 * is a special feature Google doesn't request consent for here, so it's
 * always false and deliberately not part of this.
 */
export const getPersonalizedAdsStatus =
  async (): Promise<PersonalizedAdsStatus> => {
    const choices: AdsConsentUserChoices = await AdsConsent.getUserChoices();

    if (
      choices.createAPersonalisedAdsProfile &&
      choices.selectPersonalisedAds
    ) {
      return 'personalized';
    }

    if (choices.selectBasicAds) {
      return 'general';
    }

    const hasSomeEnabled = Object.values(choices).some(Boolean);

    return hasSomeEnabled ? 'limited' : 'off';
  };
