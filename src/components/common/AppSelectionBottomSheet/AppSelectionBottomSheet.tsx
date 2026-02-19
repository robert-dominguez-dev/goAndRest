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
  'renderContent' | 'title'
> &
  Pick<AppSelectionBottomSheetItemProps<TValue>, 'onSelect'> & {
    items: AppSelectionBottomSheetItemData<TValue>[];
    title?: string;
  };

export const AppSelectionBottomSheet = <TValue,>({
  items,
  onSelect,
  title = '',
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
      title={title}
      renderContent={renderContent}
    />
  );
};
