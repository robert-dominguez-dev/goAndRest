import { getValidationRule } from './getValidationRule.ts';
import { getIsValidNumber } from '../../../shared/utils/getIsValidNumber.ts';
import { tr } from '../../../locales/constants.ts';
import { Rules } from '../types.ts';

export const getNumberInputRules = (
  min: number | undefined,
  max: number | undefined,
) =>
  ({
    required: tr('rules.required'),
    min: min ? getValidationRule(min, 'rules.min') : undefined,
    max: max ? getValidationRule(max, 'rules.max') : undefined,
    validate: value =>
      getIsValidNumber(Number(value)) || tr('rules.isNumber', { value }),
  } as const satisfies Rules);
