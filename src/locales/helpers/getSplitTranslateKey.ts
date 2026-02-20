import { TranslateKey } from '../types.ts';

type ExtractPostfix<
  TPrefix extends string,
  TKey extends TranslateKey,
> = TKey extends `${TPrefix}.${infer Postfix}` ? Postfix : never;

export const getSplitTranslateKey = <
  TPrefix extends string,
  TPostfix extends ExtractPostfix<TPrefix, TranslateKey>,
>(
  translateKeyPrefix: TPrefix,
  translateKeyPostfix: TPostfix,
): TranslateKey =>
  `${translateKeyPrefix}.${translateKeyPostfix}` as TranslateKey;
