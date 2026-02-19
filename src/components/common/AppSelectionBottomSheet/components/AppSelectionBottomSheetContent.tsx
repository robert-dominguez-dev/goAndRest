import { AppView } from '../../AppView/AppView.tsx';
import {
  AppSelectionBottomSheetItem,
  AppSelectionBottomSheetItemData,
  AppSelectionBottomSheetItemProps,
} from './AppSelectionBottomSheetItem.tsx';
import { checkIsLast } from '../../../../helpers/checkIsLast.ts';
import { AppDivider } from '../../AppDivider.tsx';
import { AppBottomSheetRenderContentProps } from '../../AppBottomSheet/AppBottomSheet.tsx';
import { Fragment } from 'react';

export type AppSelectionBottomSheetContentProps<TValue> =
  AppBottomSheetRenderContentProps &
    Pick<AppSelectionBottomSheetItemProps<TValue>, 'onSelect'> & {
      items: AppSelectionBottomSheetItemData<TValue>[];
    };

export const AppSelectionBottomSheetContent = <TValue,>({
  items,
  onSelect,
  onClose,
}: AppSelectionBottomSheetContentProps<TValue>) => {
  const handleSelect: AppSelectionBottomSheetItemProps<TValue>['onSelect'] =
    value => {
      onSelect(value);
      onClose();
    };

  return (
    <AppView>
      {items.map((item, index) => {
        const withDivider = !checkIsLast(items, index);

        return (
          <Fragment key={item.label}>
            <AppSelectionBottomSheetItem
              {...item}
              onSelect={handleSelect}
            />
            {withDivider && <AppDivider />}
          </Fragment>
        );
      })}
    </AppView>
  );
};
