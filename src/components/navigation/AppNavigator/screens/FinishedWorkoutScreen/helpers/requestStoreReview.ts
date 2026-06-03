import { Linking, Platform } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { logCustomEvent } from '../../../../helpers/logCustomEvent.ts';
import { IS_DEV_MODE } from '../../../../../../constants/common.ts';
import { getErrorMessage } from '../../../../../../helpers/getErrorMessage.ts';

const IOS_APP_ID = '6759486331';
const ANDROID_PACKAGE_NAME = 'com.goandrest';

export const requestStoreReview = async (): Promise<void> => {
  const isInAppReviewAvailable = InAppReview.isAvailable();

  void logCustomEvent('request_store_review_attempt', {
    isInAppReviewAvailable,
  });

  if (isInAppReviewAvailable) {
    try {
      await InAppReview.RequestInAppReview();
      void logCustomEvent('request_store_review_success', {
        reviewType: 'in_app_review',
      });
      return undefined;
    } catch (error) {
      void logCustomEvent('request_store_review_failure', {
        errorMessage: getErrorMessage(error),
        reviewType: 'in_app_review',
      });

      if (IS_DEV_MODE)
        console.log('In-app review failed, trying fallback...', error);
    }
  }

  const storeUrl = Platform.select({
    ios: `itms-apps://apps.apple.com/app/id${IOS_APP_ID}?action=write-review`,
    android: `market://details?id=${ANDROID_PACKAGE_NAME}`,
    default: '',
  });

  if (!storeUrl) {
    return undefined;
  }

  try {
    const canOpen = await Linking.canOpenURL(storeUrl);

    if (canOpen) {
      await Linking.openURL(storeUrl);
      void logCustomEvent('request_store_review_success', {
        reviewType: 'store_redirect',
      });
    } else {
      const webUrl = Platform.select({
        ios: `https://apps.apple.com/app/id${IOS_APP_ID}`,
        android: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`,
      });

      if (webUrl) {
        await Linking.openURL(webUrl);
        void logCustomEvent('request_store_review_success', {
          reviewType: 'web_url_redirect',
        });
      }
    }
  } catch (error) {
    void logCustomEvent('request_store_review_failure', {
      errorMessage: getErrorMessage(error),
      reviewType: 'web_url_redirect',
    });

    if (IS_DEV_MODE) {
      console.error('Failed to open store', error);
    }
  }
};
