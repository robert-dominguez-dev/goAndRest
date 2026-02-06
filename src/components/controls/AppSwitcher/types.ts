import { PrimitiveValue } from '../../../types/common.ts';
import { Option } from '../types.ts';

export type AppSwitcherSpecificProps<TOptionValue extends PrimitiveValue> = {
  options: Option<TOptionValue>[];
};
