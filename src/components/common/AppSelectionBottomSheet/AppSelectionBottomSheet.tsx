import {
  AppBottomSheet,
  AppBottomSheetProps,
} from '../AppBottomSheet/AppBottomSheet.tsx';
import {
  AppSelectionBottomSheetItemData,
  AppSelectionBottomSheetItemProps,
} from './components/AppSelectionBottomSheetItem.tsx';
import { AppSelectionBottomSheetContent } from './components/AppSelectionBottomSheetContent.tsx';

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
  const renderContent: AppBottomSheetProps['renderContent'] = ({ onClose }) => (
    <AppSelectionBottomSheetContent
      items={items}
      onSelect={onSelect}
      onClose={onClose}
    />
  );

  return (
    <AppBottomSheet
      {...props}
      renderContent={renderContent}
    />
  );
};
