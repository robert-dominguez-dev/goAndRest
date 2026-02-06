import isString from 'lodash/isString';
import { getIsValidNumber } from '../../../../shared/utils/getIsValidNumber.ts';

export const getAppInputStringValue = (value: unknown) => {
  if (isString(value)) {
    return value;
  }

  if (getIsValidNumber(value)) {
    return String(value);
  }

  return undefined;
};
