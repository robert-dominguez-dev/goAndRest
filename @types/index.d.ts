
type ObjectKeys<T> = 0 extends 1 & T // isAny - sure we don't use it, but the API generator does
  ? string[]
  : T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<never> | string
  ? string[]
  : never;

type ObjectValues<T> = T[keyof T][];

type ObjectEntry<T> = [keyof T, T[keyof T]];

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
  values<T>(o: T): ObjectValues<T>;
  entries<T>(o: T): ObjectEntry<T>[];
}
