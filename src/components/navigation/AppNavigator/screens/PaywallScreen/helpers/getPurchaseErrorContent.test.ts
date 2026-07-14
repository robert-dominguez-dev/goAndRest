import { PURCHASES_ERROR_CODE } from 'react-native-purchases';
import { TranslateFN } from '../../../../../../locales/hooks/useAppTranslation.ts';
import {
  getPurchaseErrorContent,
  PurchaseErrorContent,
} from './getPurchaseErrorContent';

jest.mock('react-native-purchases', () => ({
  PURCHASES_ERROR_CODE: {
    NETWORK_ERROR: '10',
    OFFLINE_CONNECTION_ERROR: '35',
    PURCHASE_NOT_ALLOWED_ERROR: '3',
    PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR: '5',
    PRODUCT_ALREADY_PURCHASED_ERROR: '6',
    PAYMENT_PENDING_ERROR: '20',
  },
}));

const t = ((key: string) => key) as unknown as TranslateFN;

type TestCase = {
  description: string;
  input: PURCHASES_ERROR_CODE | undefined;
  expectedOutput: PurchaseErrorContent;
};

const testCases: TestCase[] = [
  {
    description: 'returns network error content for NETWORK_ERROR',
    input: PURCHASES_ERROR_CODE.NETWORK_ERROR,
    expectedOutput: {
      title: 'common.paywall.errorPopUp.title',
      description: 'common.paywall.errorNetwork',
      iconName: 'TriangleAlert',
      canRestore: false,
    },
  },
  {
    description: 'returns network error content for OFFLINE_CONNECTION_ERROR',
    input: PURCHASES_ERROR_CODE.OFFLINE_CONNECTION_ERROR,
    expectedOutput: {
      title: 'common.paywall.errorPopUp.title',
      description: 'common.paywall.errorNetwork',
      iconName: 'TriangleAlert',
      canRestore: false,
    },
  },
  {
    description: 'returns not-allowed content for PURCHASE_NOT_ALLOWED_ERROR',
    input: PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR,
    expectedOutput: {
      title: 'common.paywall.errorPopUp.title',
      description: 'common.paywall.errorNotAllowed',
      iconName: 'TriangleAlert',
      canRestore: false,
    },
  },
  {
    description:
      'returns product-unavailable content for PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR',
    input: PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR,
    expectedOutput: {
      title: 'common.paywall.errorPopUp.title',
      description: 'common.paywall.errorProductUnavailable',
      iconName: 'TriangleAlert',
      canRestore: false,
    },
  },
  {
    description:
      'returns already-owned content for PRODUCT_ALREADY_PURCHASED_ERROR',
    input: PURCHASES_ERROR_CODE.PRODUCT_ALREADY_PURCHASED_ERROR,
    expectedOutput: {
      title: 'common.paywall.errorAlreadyOwnedTitle',
      description: 'common.paywall.errorAlreadyOwned',
      iconName: 'Info',
      canRestore: true,
    },
  },
  {
    description: 'returns pending content for PAYMENT_PENDING_ERROR',
    input: PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR,
    expectedOutput: {
      title: 'common.paywall.pendingPopUp.title',
      description: 'common.paywall.pendingPopUp.description',
      iconName: 'Clock',
      canRestore: false,
    },
  },
  {
    description: 'returns generic error content for undefined code',
    input: undefined,
    expectedOutput: {
      title: 'common.paywall.errorPopUp.title',
      description: 'common.paywall.errorPopUp.description',
      iconName: 'CircleX',
      canRestore: false,
    },
  },
];

describe('getPurchaseErrorContent', () => {
  it.each(testCases)('$description', ({ input, expectedOutput }) => {
    expect(getPurchaseErrorContent(input, t)).toEqual(expectedOutput);
  });
});
