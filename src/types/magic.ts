export type NestedKeys<TObject, Prefix extends string = ''> = {
  [Key in keyof TObject & string]: TObject[Key] extends object
    ? NestedKeys<TObject[Key], `${Prefix}${Key}.`>
    : `${Prefix}${Key}`;
}[keyof TObject & string];
