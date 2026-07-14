import { PURCHASES_ERROR_CODE } from 'react-native-purchases';
import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import { AppIconName } from '../../../../../common/AppIcon.tsx';

export type PurchaseErrorContent = {
  title: string;
  description: string;
  iconName: AppIconName;
  canRestore: boolean;
};

// Maps a RevenueCat purchase error to user-facing content shown in the paywall error pop-up.
export const getPurchaseErrorContent = (
  code: PURCHASES_ERROR_CODE | undefined,
  t: TranslateFN,
): PurchaseErrorContent => {
  switch (code) {
    case PURCHASES_ERROR_CODE.NETWORK_ERROR:
    case PURCHASES_ERROR_CODE.OFFLINE_CONNECTION_ERROR:
      return {
        title: t('common.paywall.errorPopUp.title'),
        description: t('common.paywall.errorNetwork'),
        iconName: 'TriangleAlert',
        canRestore: false,
      };
    case PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR:
      return {
        title: t('common.paywall.errorPopUp.title'),
        description: t('common.paywall.errorNotAllowed'),
        iconName: 'TriangleAlert',
        canRestore: false,
      };
    case PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR:
      return {
        title: t('common.paywall.errorPopUp.title'),
        description: t('common.paywall.errorProductUnavailable'),
        iconName: 'TriangleAlert',
        canRestore: false,
      };
    case PURCHASES_ERROR_CODE.PRODUCT_ALREADY_PURCHASED_ERROR:
      return {
        title: t('common.paywall.errorAlreadyOwnedTitle'),
        description: t('common.paywall.errorAlreadyOwned'),
        iconName: 'Info',
        canRestore: true,
      };
    case PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR:
      return {
        title: t('common.paywall.pendingPopUp.title'),
        description: t('common.paywall.pendingPopUp.description'),
        iconName: 'Clock',
        canRestore: false,
      };
    default:
      return {
        title: t('common.paywall.errorPopUp.title'),
        description: t('common.paywall.errorPopUp.description'),
        iconName: 'CircleX',
        canRestore: false,
      };
  }
};
