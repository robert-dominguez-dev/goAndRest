import { tr } from '../../locales/constants.ts';
import { getValidationRule } from './helpers/getValidationRule.ts';
import { Rules } from './types.ts';

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 12;

export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 30;

const USERNAME_REGEXP = /^[a-zA-Z0-9_]+$/ satisfies RegExp;
const SPACE_REGEXP = /\s/ satisfies RegExp;

export const required = tr('rules.required');

export const requiredRule = { required } as const satisfies Rules;

export const usernameInputRules = {
  required,
  maxLength: getValidationRule(MAX_USERNAME_LENGTH, 'rules.maxLength'),
  minLength: getValidationRule(MIN_USERNAME_LENGTH, 'rules.minLength'),
  pattern: {
    value: USERNAME_REGEXP,
    message: tr('rules.username'),
  },
} as const satisfies Rules;

export const passwordInputRules = {
  required,
  maxLength: getValidationRule(MAX_PASSWORD_LENGTH, 'rules.maxLength'),
  minLength: getValidationRule(MIN_PASSWORD_LENGTH, 'rules.minLength'),
  validate: value => !SPACE_REGEXP.test(value) || tr('rules.password'),
} as const satisfies Rules;
