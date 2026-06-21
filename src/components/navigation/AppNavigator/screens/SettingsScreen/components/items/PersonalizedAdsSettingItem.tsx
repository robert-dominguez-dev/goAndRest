import { memo, useEffect, useState } from 'react';
import {
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
} from 'react-native-google-mobile-ads';
import { SettingsItem } from '../SettingsItem.tsx';
import { useAppTranslation } from '../../../../../../../locales/hooks/useAppTranslation.ts';
import { getSplitTranslateKey } from '../../../../../../../locales/helpers/getSplitTranslateKey.ts';
import { AppIconAndLabel } from '../../../../../../controls/AppButton/components/AppIconAndLabel.tsx';
import { logCustomEvent } from '../../../../../helpers/logCustomEvent.ts';
import { getErrorMessage } from '../../../../../../../helpers/getErrorMessage.ts';
import { retryAsync } from '../../../../../../../helpers/retryAsync.ts';
import {
  getPersonalizedAdsStatus,
  PersonalizedAdsStatus,
} from '../../helpers/getPersonalizedAdsStatus.ts';

const PERSONALIZED_ADS_STATUS_TRANSLATE_KEY_PREFIX =
  'screens.settingsScreen.otherSection.items.personalizedAds.status';

const PersonalizedAdsSettingItemComponent = () => {
  const t = useAppTranslation();

  const [status, setStatus] = useState<PersonalizedAdsStatus>('unknown');

  const refreshStatus = async () => {
    try {
      const status = await getPersonalizedAdsStatus();
      setStatus(status);
      void logCustomEvent('ads_consent_change', { status });
    } catch (error) {
      setStatus('unknown');
      void logCustomEvent('ads_consent_failure', {
        errorMessage: getErrorMessage(error),
      });
    }
  };

  useEffect(() => {
    void refreshStatus();
  }, []);

  const handlePress = async () => {
    try {
      await retryAsync(async () => {
        const consentInfo = await AdsConsent.requestInfoUpdate();

        if (
          consentInfo.privacyOptionsRequirementStatus ===
          AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
        ) {
          await AdsConsent.showPrivacyOptionsForm();
        } else if (consentInfo.isConsentFormAvailable) {
          await AdsConsent.showForm();
        }
      });
    } finally {
      void refreshStatus();
    }
  };

  const label = t(
    getSplitTranslateKey(PERSONALIZED_ADS_STATUS_TRANSLATE_KEY_PREFIX, status),
  );

  const accessoryRight = (
    <AppIconAndLabel
      grow={false}
      label={label}
      textColorStatus={'textMuted'}
      category={'subHeader'}
    />
  );

  return (
    <SettingsItem
      title={t(
        'screens.settingsScreen.otherSection.items.personalizedAds.label',
      )}
      description={t(
        'screens.settingsScreen.otherSection.items.personalizedAds.description',
      )}
      onPress={handlePress}
      accessoryRight={accessoryRight}
    />
  );
};

export const PersonalizedAdsSettingItem = memo(
  PersonalizedAdsSettingItemComponent,
);
