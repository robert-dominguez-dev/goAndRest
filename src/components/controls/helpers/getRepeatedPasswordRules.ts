import { tr } from '../../../locales/constants.ts';
import type { Rules } from '../types.ts';
import { passwordInputRules } from '../constants.ts';

export const getRepeatedPasswordRules = (password: string) =>
  ({
    ...passwordInputRules,
    validate: repeatedPassword =>
      password === repeatedPassword ||
      tr('loginScreen.registerBottomSheet.passwordsDoNotMatch'),
  } as const satisfies Rules);
