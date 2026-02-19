import {
  AppBottomSheet,
  AppBottomSheetProps,
} from '../AppBottomSheet/AppBottomSheet.tsx';
import { AppView } from '../AppView/AppView.tsx';
import {
  AppSelectionBottomSheetItem,
  AppSelectionBottomSheetItemData,
  AppSelectionBottomSheetItemProps,
} from './components/AppSelectionBottomSheetItem.tsx';
import { checkIsLast } from '../../../helpers/checkIsLast.ts';
import { AppDivider } from '../AppDivider.tsx';

export type AppSelectionBottomSheetProps<TValue> = Omit<
  AppBottomSheetProps,
  'renderContent'
> &
  Pick<AppSelectionBottomSheetItemProps<TValue>, 'onSelect'> & {
    items: AppSelectionBottomSheetItemData<TValue>[];
  };

export const AppSelectionBottomSheet = <TValue,>({
  items,
  onSelect,
  ...props
}: AppSelectionBottomSheetProps<TValue>) => {
  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => {
    const handleSelect: AppSelectionBottomSheetItemProps<TValue>['onSelect'] =
      value => {
        onSelect(value);
        onClose();
      };

    return (
      <AppView>
        {items.map((item, index) => {
          const withDivider = checkIsLast(items, index);

          return (
            <>
              <AppSelectionBottomSheetItem
                key={item.label}
                {...item}
                onSelect={handleSelect}
              />
              {withDivider && <AppDivider />}
            </>
          );
        })}
      </AppView>
    );
  };

  return (
    <AppBottomSheet
      {...props}
      renderContent={renderContent}
    />
  );
};
