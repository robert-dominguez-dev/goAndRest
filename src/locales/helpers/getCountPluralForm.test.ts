import { getCountPluralForm } from './getCountPluralForm.ts';

describe('getCountPluralForm', () => {
  type TestCase = {
    description: string;
    count: number;
    expected: 'one' | 'few' | 'many';
  };

  const testCases: TestCase[] = [
    { description: '0 -> many', count: 0, expected: 'many' },
    { description: '1 -> one', count: 1, expected: 'one' },
    { description: '2 -> few', count: 2, expected: 'few' },
    { description: '3 -> few', count: 3, expected: 'few' },
    { description: '4 -> few', count: 4, expected: 'few' },
    { description: '5 -> many', count: 5, expected: 'many' },
    { description: '6 -> many', count: 6, expected: 'many' },
    { description: 'large number -> many', count: 100, expected: 'many' },
    { description: 'negative number -> many', count: -1, expected: 'many' },
  ];

  it.each(testCases)('$description', ({ count, expected }) => {
    expect(getCountPluralForm(count)).toBe(expected);
  });
});
