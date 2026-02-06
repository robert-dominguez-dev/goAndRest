import { checkIsLast } from './checkIsLast';

type TestObject = {
    array: Array<unknown>;
    currentIndex: number;
    expectedIsLast: boolean;
};

const emptyArrayTestObject: TestObject = {
  array: [],
  currentIndex: 0,
  expectedIsLast: false,
};

const trueTestObject: TestObject = {
  array: [ 1, 2, 3 ],
  currentIndex: 2,
  expectedIsLast: true,
};

const falseTestObject: TestObject = {
  array: [ 1, 2, 3 ],
  currentIndex: 0,
  expectedIsLast: false,
};

const testArray: Array<TestObject> = [
  emptyArrayTestObject,
  trueTestObject,
  falseTestObject,
];

test.each(testArray)(
  'should return true if current index is the last index of provided array',
  ({ array, currentIndex, expectedIsLast }) => {
    expect(checkIsLast(array, currentIndex)).toStrictEqual(expectedIsLast);
  },
);
