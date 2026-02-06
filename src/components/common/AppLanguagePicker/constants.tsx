import { appIcons } from '../../icons/constants.tsx';
import { SupportedLanguageCode } from '../../../shared/types.ts';

export const appLanguageCodeToIcon: Record<SupportedLanguageCode, JSX.Element> =
  {
    [SupportedLanguageCode.cs]: appIcons.csFlag,
    [SupportedLanguageCode.sk]: appIcons.skFlag,
    [SupportedLanguageCode.en]: appIcons.enFlag,
  };
