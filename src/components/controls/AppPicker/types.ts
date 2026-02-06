import { PrimitiveValue } from '../../../types/common.ts';
import { Option } from '../types.ts';
import { AppColorUnion, AppDimensions } from '../../../types/ui.ts';
import { AppIllustration } from '../../../assets/constants.ts';

export type PickerOption<TOptionValue extends PrimitiveValue> = Pick<
  Option<TOptionValue>,
  'value'
> & {
  backgroundColorStatus?: AppColorUnion;
  illustrationName?: AppIllustration;
};

export type AppPickerSpecificProps<TOptionValue extends PrimitiveValue> = {
  options: PickerOption<TOptionValue>[];
  itemDimensions: AppDimensions;
};
