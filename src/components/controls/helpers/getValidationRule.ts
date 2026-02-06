import { TranslateKey } from '../../../locales/types.ts';
import { ValidationRule } from 'react-hook-form';
import { tr } from '../../../locales/constants.ts';
import { PrimitiveValue } from '../../../types/common.ts';

export const getValidationRule = <TRuleValue extends PrimitiveValue>(
  value: TRuleValue,
  translateKey: TranslateKey,
): ValidationRule<TRuleValue> => ({
  value,
  message: tr(translateKey, { value: String(value) }),
});
