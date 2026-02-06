import isString from 'lodash/isString';
import { checkIsValidNumber } from '../../../../helpers/checkIsValidNumber.ts';

export const getAppInputStringValue = (value: unknown) => {
  if (isString(value)) {
    return value;
  }

  if (checkIsValidNumber(value)) {
    return String(value);
  }

  return undefined;
};
